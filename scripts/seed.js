const csv = require('csv-parser');
const fs = require('fs');
const db = require('../server/db')
const {Country, Population} = require('../server/db/models')

async function seed() {

    
    
    await db.sync({force: true})
    console.log('db synced!')

    fs.createReadStream('/Users/erickabalanzategui/Interviews/EmptorDashboard/scripts/SP.POP.TOTL.csv')
        .pipe(csv({skipLines: 5, headers: false}))
        .on('data', async (row) => {
            let country = await Country.create({name: row[0],
                                code: row[1]})
            for(let i = 4; i < 63; i++){
                let popYear = 1956 + i;
                await Population.create({year: popYear,
                                total: row[i],
                                countryId: country.id})
            }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

    console.log(`seeded data`)

    console.log(`seeded successfully`)
}
seed()
