const militaryUnit = [
    8.30,
    8.79,
    9.39,
    10.08,
    10.85,
    11.68,
    12.57,
    13.51,
    14.50,
    15.53,
    16.61,
    17.72,
    18.88,
    20.07,
    21.29,
    22.55,
    23.84,
    25.15,
    26.50,
    27.88
];

const militaryUnitUnits = {
    infantryman: {
        time: 9, //hours
        costs: {
            food: 400,
            wood: 250,
            metal: 100
        },
        upkeep: {
            food: 1 //per hour
        }
    },
    sniper: {
        time: 20,
        costs: {
            food: 500,
            wood: 250,
            metal: 150,
            sulfur: 300
        },
        upkeep: {
            food: 1
        }
    },
    grenadeLauncher: {
        time: 12,
        costs: {
            food: 250,
            wood: 300,
            metal: 100,
            sulfur: 150
        },
        upkeep: {
            food: 1
        }
    }
};


$(document).ready(function () {
    const grid = $("#grid-basic");

    setTimeout(()=>{
        let data = grid.data('.rs.jquery.bootgrid').rows;

        data.push({
            domain: 1,
            status: 1,
            emails: 1,
            sendTemplates: 1,
            lastSent: 1,
            blockedTill: 1,
            actions: 1});

            grid.bootgrid('reload')

    }, 1000);

    grid.bootgrid({
            ajax: false,
            navigation: 0,
            formatters: {
                emails: (col, row) => {
                    const count = row.emails;
                    const current = 'info@thewowgallery.co.uk';
                    if (count > 0) {
                        return `<div data-toggle="tooltip" title="Current email: ${current}" class="btn btn-info showEmails">Total: ${count}</div>`
                    } else {
                        return `<div class="btn btn-default disabled">No emails</div>`
                    }
                },
                lastSent: (col, row) => {
                    let remaining = moment.utc(moment(moment.now()).diff(moment(row.lastSent, "DD-MM-YYYY HH:mm:ss")));
                    return `<span data-toggle="tooltip" title="${remaining.format("DD-MM-YYYY HH:mm:ss")}">Send ${remaining.format('D')} days ${remaining.format('H')} hours ago</span>`
                },
                blockedTill: (col, row) => {
                    let remaining = moment.utc(moment(row.blockedTill, "DD-MM-YYYY HH:mm:ss").diff(moment(row.lastSent, "DD-MM-YYYY HH:mm:ss")));
                    return `Remaining ${remaining.format('D')} days ${remaining.format('H')} hours`
                },
                actions: (col, row) => {
                    return `<div style="margin-right: 5px;" class="btn btn-danger">Block</div>
                            <div class="btn btn-danger">Remove</div>`
                }
            }
        })
        .on("loaded.rs.jquery.bootgrid", function (e) {
            $('[data-toggle="tooltip"]').tooltip();

            $('.showEmails').on('click', () => $('#emails').modal('show'))
        });
});