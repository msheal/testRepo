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
                    return '<span class="food"></span>'
                },
                wood: (col, row) => {
                    return '<span class="wood"></span>'
                },
                metal: (col, row) => {
                    return '<span class="metal"></span>'
                },
                sulfur: (col, row) => {
                    return '<span class="sulfur"></span>'
                },
                goldPerHour: (col, row) => {
                    return '<span class="goldPerHour"></span>'
                }
            }
        })
        .on("loaded.rs.jquery.bootgrid", function (e) {
            $('[data-toggle="tooltip"]').tooltip();



            table.find('.selectedUnit, .selectedStructure').on('change', function () {
                const row = $(this).closest('tr');
                calcProdUnit(row)
            }).trigger('change')
        });
});

function calcProdUnit(row){
    const structureProdSpeed = row.find('.selectedStructure :selected').val();
    const selectedUnit = row.find('.selectedUnit :selected').val();
    let {time,
        costs: {food = 0, wood = 0, metal = 0, sulfur = 0},
        upkeep} =  militaryUnitUnits[selectedUnit];
    const unitsPerDay = (24 / time  * structureProdSpeed).toFixed(2);

    food = (food * unitsPerDay / 24).toFixed(2);
    wood = (wood * unitsPerDay / 24).toFixed(2);
    metal = (metal * unitsPerDay / 24).toFixed(2);
    sulfur = (sulfur * unitsPerDay / 24).toFixed(2);
    let goldPerHour = (food * 240 + wood * 240 + metal * 550 + sulfur * 600) / 1000;

    row.find('.prodUnitPerHour').text(unitsPerDay);
    row.find('.food').text(food);
    row.find('.wood').text(wood);
    row.find('.metal').text(metal);
    row.find('.sulfur').text(sulfur);
    row.find('.goldPerHour').text(goldPerHour.toFixed(2));

    let table = row.closest('table').find('tbody');
    calcTotal(table)
}

function calcTotal(table){
    let prodUnitPerHour = 0;
    let food = 0;
    let wood = 0;
    let metal = 0;
    let sulfur = 0;
    let goldPerHour = 0;

    table.find('.totalRow').remove();

    table.find('tr').each(function(){
        prodUnitPerHour += parseFloat($(this).find('.prodUnitPerHour').text());
        food += parseFloat($(this).find('.food').text());
        wood += parseFloat($(this).find('.wood').text());
        metal += parseFloat($(this).find('.metal').text());
        sulfur += parseFloat($(this).find('.sulfur').text());
        goldPerHour += parseFloat($(this).find('.goldPerHour').text());

    });

    let totalRow = `<tr class="totalRow">
        <td colspan="2" class="text-right">Total:</td>
        <td>${prodUnitPerHour.toFixed(2)}</td>
        <td>${food.toFixed(2)}</td>
        <td>${wood.toFixed(2)}</td>
        <td>${metal.toFixed(2)}</td>
        <td>${sulfur.toFixed(2)}</td>
        <td>${goldPerHour.toFixed(2)}</td>
    </tr>`;

    table.append(totalRow)
}