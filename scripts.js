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
    gunner: {
        name: 'Автоматчик',
        time: 7, //hours
        costs: {
            food: 300,
            wood: 150,
            metal: 100,
            sulfur: 25
        }
    },
    machineGunner: {
        name: 'Пулеметчик',
        time: 20,
        costs: {
            population: 3,
            food: 600,
            wood: 600,
            metal: 500,
            sulfur: 500
        }
    },
    soldier: {
        name: 'Солдат',
        time: 4,
        costs: {
            food: 200,
            wood: 100,
            metal: 75
        }
    },
    huntsman: {
        name: 'Егерь',
        time: 14,
        costs: {
            food: 400,
            wood: 150,
            metal: 100,
            sulfur: 200
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
        }
    },
    infantryman: {
        name: 'Пехотинец',
        time: 9,
        costs: {
            food: 400,
            wood: 250,
            metal: 100
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
        }
    },
    mortar: {
        name: 'Минометчик',
        time: 15,
        costs: {
            population: 3,
            food: 400,
            wood: 500,
            metal: 150,
            sulfur: 250
        }
    },
    flamethrower: {
        name: 'Огнеметчик',
        time: 15,
        costs: {
            food: 400,
            wood: 400,
            metal: 150,
            sulfur: 350
        }
    }
};


$(document).ready(function () {

    $('body')
        .on('change', '.selectedUnit, .selectedStructure', function () {
            const row = $(this).closest('tr');
            calcProdUnit(row)
        })
        .on('click', '.cloneRow', function () {
            cloneRow($(this))
        })
        .on('click', '.removeRow', function () {
            removeRow($(this))
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
        <td class="population"></td>
        <td class="food"></td>
        <td class="wood"></td>
        <td class="metal"></td>
        <td class="sulfur"></td>
        <td class="goldPerHour"></td>
        <td><span class="actions"><i class="fa fa-clone cloneRow" title="Клонировать ряд"></i><i class="fa fa-trash removeRow" title="Удалить"></i></span></td>
    </tr>`);

    table.append(row);
    calcProdUnit(row);
}

function cloneRow(el){
    let row = el.closest('tr').clone();

    row.insertAfter(el.closest('tr'));

    el.closest('tr').find("select").each(function(i) {
        row.find("select").eq(i).val($(this).val());
    });

    calcProdUnit(row);
}

function removeRow(el){
    const table = $("#grid");
    el.closest('tr').remove();
    calcTotal(table)
}

function calcProdUnit(row){
    const table = $("#grid");
    const structureProdSpeed = row.find('.selectedStructure :selected').val();
    const selectedUnit = row.find('.selectedUnit :selected').val();
    let {time,
        costs: {food = 0, wood = 0, metal = 0, sulfur = 0, population = 1}
        } =  militaryUnitUnits[selectedUnit];
    const unitsPerDay = (24 / time  * structureProdSpeed).toFixed(2);

    population = (population * unitsPerDay).toFixed(2);
    food = (food * unitsPerDay / 24).toFixed(2);
    wood = (wood * unitsPerDay / 24).toFixed(2);
    metal = (metal * unitsPerDay / 24).toFixed(2);
    sulfur = (sulfur * unitsPerDay / 24).toFixed(2);
    let goldPerHour = (food * 240 + wood * 240 + metal * 550 + sulfur * 600) / 1000;

    row.find('.population').text(population);
    row.find('.prodUnitPerHour').text(unitsPerDay);
    row.find('.food').text(food);
    row.find('.wood').text(wood);
    row.find('.metal').text(metal);
    row.find('.sulfur').text(sulfur);
    row.find('.goldPerHour').text(goldPerHour.toFixed(2));


    row.find('.actions i').tooltip().on('click', function () {
        $(this).tooltip('hide')
    });

    calcTotal(table);
}

function calcTotal(table){
    const tbody = table.find('tbody');

    let population = 0;
    let prodUnitPerHour = 0;
    let food = 0;
    let wood = 0;
    let metal = 0;
    let sulfur = 0;
    let goldPerHour = 0;

    tbody.find('.totalRow').remove();

    tbody.find('tr').each(function(){
        population += parseFloat($(this).find('.population').text());
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
        <td>${population.toFixed(2)}</td>
        <td>${food.toFixed(2)}</td>
        <td>${wood.toFixed(2)}</td>
        <td>${metal.toFixed(2)}</td>
        <td>${sulfur.toFixed(2)}</td>
        <td>${goldPerHour.toFixed(2)}</td>
    </tr>`;

    tbody.append(totalRow)
}