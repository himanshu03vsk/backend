require("dotenv").config({ path: '.env' });
const algoliasearch = require("algoliasearch");
const sql = require("mssql");

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex("products");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: { encrypt: true },
};

async function syncAllPartsToAlgolia() {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM Part`;

        const records = result.recordset.map((part) => ({
            objectID: part.part_id,
            name: part.part_name,
            description: part.part_description,
            price: part.price,
            color: part.part_color,
            type: part.part_type,
            category: part.part_category,
            weight: part.part_weight,
            dimensions: part.dimensions,
        }));

        const algoliaResponse = await index.saveObjects(records);
        console.log("Synced to Algolia:", algoliaResponse);
    } catch (err) {
        console.error("Sync error:", err);
    } finally {
        await sql.close();
    }
}

module.exports = syncAllPartsToAlgolia;
