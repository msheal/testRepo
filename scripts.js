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
        name: 'Пехотинец',
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
        name: 'Снайпер',
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
        name: 'Гранатометчик',
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
    const table = $("#grid-basic");

    //setTimeout(()=>{
    //    let data = grid.data('.rs.jquery.bootgrid').rows;
    //
    //    data.push({
    //        domain: 0,
    //        status: 2,
    //        emails: 1,
    //        sendTemplates: 1,
    //        lastSent: 1,
    //        blockedTill: 1,
    //        actions: 1});
    //
    //        grid.bootgrid('reload')
    //
    //}, 1000);

    table.bootgrid({
            ajax: false,
            navigation: 0,
            formatters: {
                actions: (col, row) => {
                    return `<div class="btn btn-danger">Remove</div>`
                },
                structure: (col, row) => {
                    let options = "";
                    if (row.structure === 'militaryUnit'){
                        militaryUnit.map((item, index) => {
                            options += `<option value="${item}">Военная часть ${index + 1}ур (${parseInt(item * 100)}%)</option>`
                        })
                    }
                    return `<select class="selectedStructure">${options}</select>`
                },
                prodUnit: (col, row) => {
                    let options = "";
                    if (row.prodUnit === 'infantryman'){
                        for (unit in militaryUnitUnits){
                            options += `<option value="${unit}">${militaryUnitUnits[unit].name}</option>`
                        }
                    }
                    return `<select class="selectedUnit">${options}</select>`
                },
                prodUnitPerHour: (col, row) => {
                    return '<span class="prodUnitPerHour">' +(24 / militaryUnitUnits[row.prodUnit].time  * militaryUnit[0]).toFixed(2) + '</span>';
                },
                food: (col, row) => {
                    if (row.prodUnit === 'infantryman'){
                        return militaryUnitUnits.infantryman.costs.food
                    }
                },
                wood: (col, row) => {
                    if (row.prodUnit === 'infantryman'){
                        return militaryUnitUnits.infantryman.costs.food
                    }
                },
                metal: (col, row) => {
                    if (row.prodUnit === 'infantryman'){
                        return militaryUnitUnits.infantryman.costs.food
                    }
                },
                sulfur: (col, row) => {
                    if (row.prodUnit === 'infantryman'){
                        return militaryUnitUnits.infantryman.costs.food
                    }
                },
                goldPerHour: (col, row) => {
                    return 'Gold amount per hour'
                }
            }
        })
        .on("loaded.rs.jquery.bootgrid", function (e) {
            $('[data-toggle="tooltip"]').tooltip();

            $('.showEmails').on('click', () => $('#emails').modal('show'));

            table.find('.prodUnitPerHour').each(function(){
                const row = $(this).closest('tr');

                $(this).text(calcProdUnitPerHour(row))
            });

            table.find('.selectedUnit, .selectedStructure').on('change', function () {
                const row = $(this).closest('tr');
                row.find('.prodUnitPerHour').text(calcProdUnitPerHour(row));
            })
        });
});

function calcProdUnitPerHour(row){
    const structureProdSpeed = row.find('.selectedStructure :selected').val();
    const selectedUnit = row.find('.selectedUnit :selected').val();

    return (24 / militaryUnitUnits[selectedUnit].time  * structureProdSpeed).toFixed(2);
}