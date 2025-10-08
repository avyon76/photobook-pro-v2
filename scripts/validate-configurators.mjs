import fs from 'fs';
import path from 'path';

const schema = {
  type: 'object',
  required: ['id','title','groups'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    groups: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id','label','options'],
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          required: { type: ['boolean','null'] },
          options: {
            type: 'array',
            items: { type: 'object', required: ['id','label'], properties: { id: {type:'string'}, label: {type:'string'} } }
          }
        }
      }
    }
  }
};

function validate(obj, sch, pathStr='root') {
  function fail(msg){ throw new Error(`[schema] ${pathStr}: ${msg}`); }
  if (sch.type === 'object') {
    if (typeof obj !== 'object' || Array.isArray(obj)) fail('expected object');
    if (sch.required) for (const k of sch.required) if (!(k in obj)) fail(`missing key "${k}"`);
    if (sch.properties) for (const [k, sub] of Object.entries(sch.properties)) {
      if (k in obj && sub) validate(obj[k], sub, `${pathStr}.${k}`);
    }
  } else if (sch.type === 'array') {
    if (!Array.isArray(obj)) fail('expected array');
    if (sch.items) obj.forEach((v,i)=>validate(v, sch.items, `${pathStr}[${i}]`));
  } else if (Array.isArray(sch.type)) {
    // allow anything in simple script
  } else if (sch.type) {
    const t = typeof obj;
    if (t !== sch.type) fail(`expected ${sch.type}, got ${t}`);
  }
}

const dir = path.join(process.cwd(), 'config', 'configurators');
const files = fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
for (const f of files) {
  const obj = JSON.parse(fs.readFileSync(path.join(dir,f), 'utf-8'));
  validate(obj, schema, f);
  console.log(`[schema] OK ${f}`);
}
