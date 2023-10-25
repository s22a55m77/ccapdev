import pg from 'pg';
import data from './data.json' assert {type: 'json'};

const client = new pg.Client({
  host: 'dpg-ckp1v4gujous73ccu1k0-a.singapore-postgres.render.com',
  port: 5432,
  user: 'ccapdev_user',
  password: 'bni7hMGNYfJ2qlGiupcaeTAz8w3hfWKC',
  database: 'ccapdev',
  ssl: true
});
await client.connect();

const regionKeys = Object.keys(data);
regionKeys.forEach(async (region) => {
  const regionName = data[region].region_name

  // INSERT REGION
  if (!(await client.query(`SELECT name from region WHERE name = '${regionName}'`).then((res) => res.rowCount))) {
    await client.query(`INSERT INTO region(name) VALUES('${regionName}')`)
    console.log(`INSERT region: ${regionName}`);

    // INSERT PROVINCE
    const provinceKeys = Object.keys(data[region].province_list);
    for (const province of provinceKeys) {
      const regionId = await client.query(`SELECT id from region WHERE name = '${regionName}'`).then((res) => res.rows[0].id);
      await client.query(`INSERT INTO province(name, "regionId") VALUES('${province}', ${regionId})`)
      console.log(`INSERT province: ${province}`);

      // INSERT CITY
      const cityKeys = Object.keys(data[region].province_list[province].municipality_list)
      for (const city of cityKeys) {
        const provinceId = await client.query(`SELECT id from province WHERE name = '${province}'`).then((res) => res.rows[0].id);
        const query = {
          text: 'INSERT INTO city(name, "provinceId") VALUES($1, $2)',
          values: [city, provinceId]
        }
        await client.query(query);
        console.log(`INSERT city: ${city}`);
      }
    }
  } else {
    console.log(`SKIP region: ${regionName}`);
  }
})
