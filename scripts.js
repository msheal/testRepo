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
    $('body').on('change', '.selectedUnit, .selectedStructure', function () {
        const row = $(this).closest('tr');
        calcProdUnit(row)
    });

    $('#structureCreate').find('.dropdown-menu a').on('click', function(e){
        e.preventDefault();

        $(this).attr('data-type')
            ? createBuilding($(this).attr('data-type'))
            : false

    })
});

function createBuilding(type){
    const table = $("#grid");
    let structureOptions = "";
    let unitOptions = "";

    switch (type){
        case 'militaryUnit':
            militaryUnit.map((item, index) => {
                structureOptions += `<option value="${item}">Военная часть ${index + 1}ур (${parseInt(item * 100)}%)</option>`
            });
            for (unit in militaryUnitUnits){
                unitOptions += `<option value="${unit}">${militaryUnitUnits[unit].name}</option>`
            }
            break;
    }

    let row = $(`<tr>
        <td><select class="selectedStructure">${structureOptions}</select></td>
        <td><select class="selectedUnit">${unitOptions}</select></td>
        <td class="prodUnitPerHour"></td>
        <td class="food"></td>
        <td class="wood"></td>
        <td class="metal"></td>
        <td class="sulfur"></td>
        <td class="goldPerHour"></td>
        <td><span class="actions"><i class="fa fa-clone cloneRow" title="Клонировать ряд"></i><i class="fa fa-trash removeRow" title="Удалить"></i></span></td>
    </tr>`);

    table.append(row);
    row.find('.actions i').tooltip();

    calcProdUnit(row);
}

function calcProdUnit(row){
    const table = $("#grid");
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

    calcTotal(table)
}

function calcTotal(table){
    const tbody = table.find('tbody');

    let prodUnitPerHour = 0;
    let food = 0;
    let wood = 0;
    let metal = 0;
    let sulfur = 0;
    let goldPerHour = 0;

    tbody.find('.totalRow').remove();

    tbody.find('tr').each(function(){
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

    tbody.append(totalRow)
}