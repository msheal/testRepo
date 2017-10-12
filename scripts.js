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

const militaryPlant = [
    2.00,
    2.32,
    2.72,
    3.18,
    3.69,
    4.24,
    4.83,
    5.46,
    6.11,
    6.80,
    7.51,
    8.25,
    9.02,
    9.81,
    10.62,
    11.46,
    12.31,
    13.19,
    14.09,
    15.00
];

const militaryPlantUnits = {
    armoredCar: {
        name: 'Бронеавтомобиль',
        time: 24,
        costs: {
            population: 6,
            food: 1500,
            wood: 3000,
            metal: 1000,
            fuel: 1000
        }
    },
    lightTank: {
        name: 'Лёгкий танк',
        time: 48,
        costs: {
            population: 10,
            food: 3000,
            wood: 6000,
            metal: 3000,
            fuel: 2000
        }
    },
    divisionGun: {
        name: 'Дивизионная пушка',
        time: 48,
        costs: {
            population: 8,
            food: 3000,
            wood: 7000,
            metal: 1800,
            sulfur: 750
        }
    },
    modernTank: {
        name: 'Современный танк',
        time: 150,
        costs: {
            population: 28,
            food: 10000,
            wood: 20000,
            metal: 11000,
            fuel: 5000
        }
    },
    cannon: {
        name: 'Пушка',
        time: 10,
        costs: {
            population: 5,
            food: 250,
            wood: 250,
            metal: 450,
            sulfur: 250
        }
    },
    mortar: {
        name: 'Мортира',
        time: 10,
        costs: {
            population: 5,
            food: 250,
            wood: 350,
            metal: 300,
            sulfur: 300
        }
    },
    reactiveArtillery: {
        name: 'Реактивная артиллерия',
        time: 150,
        costs: {
            population: 25,
            food: 10000,
            wood: 25000,
            metal: 10000,
            sulfur: 5000
        }
    },
    infantryFightingVehicle: {
        name: 'Боевая машина пехоты',
        time: 70,
        costs: {
            population: 15,
            food: 5000,
            wood: 10000,
            metal: 5000,
            fuel: 2500
        }
    },
    antiAircraftGun: {
        name: 'Зенитное орудие',
        time: 20,
        costs: {
            population: 5,
            food: 700,
            wood: 1000,
            metal: 400,
            sulfur: 350
        }
    },
    tankJaguar: {
        name: 'Танк-ягуар',
        time: 60,
        costs: {
            population: 10,
            food: 5000,
            wood: 10000,
            metal: 3000,
            fuel: 1000
        }
    },
    heavyTank: {
        name: 'Тяжелый танк',
        time: 84,
        costs: {
            population: 15,
            food: 5000,
            wood: 12000,
            metal: 5000,
            fuel: 3000
        }
    },
    armoredPersonnelCarrier: {
        name: 'Бронетранспортер',
        time: 40,
        costs: {
            population: 8,
            food: 2500,
            wood: 5000,
            metal: 2000,
            fuel: 1500
        }
    },
    jetMortar: {
        name: 'Реактивный миномет',
        time: 96,
        costs: {
            population: 15,
            food: 5000,
            wood: 15000,
            metal: 3500,
            sulfur: 2000
        }
    },
    ZRPK: {
        name: 'ЗРПК',
        time: 75,
        costs: {
            population: 25,
            food: 4000,
            wood: 5000,
            metal: 2500,
            sulfur: 1500
        }
    }
};

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

    loadData();

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

function loadData(){
    let data = JSON.parse(localStorage.getItem('tableData'));

    data.map(({structure, structureLevel, unit}) => {
        createBuilding(structure, structureLevel, unit)
    })
}

//level and unit used on load data from local storage
function createBuilding(type, level, unit){
    const table = $("#grid");
    let structureOptions = "";
    let unitOptions = "";
    let unitsObject = {};
    switch (type){
        case 'militaryUnit':
            militaryUnit.map((item, index) => {
                const selected = (level - 1) === index ? 'selected="selected"' : "";
                structureOptions += `<option value="${item}" data-level="${index + 1}" ${selected}>Военная часть ${index + 1}ур (${parseInt(item * 100)}%)</option>`
            });
            for (_unit in militaryUnitUnits){
                const selected = _unit === unit ? 'selected="selected"' : "";
                unitOptions += `<option value="${_unit}" ${selected}>${militaryUnitUnits[_unit].name}</option>`
            }
            unitsObject = militaryUnitUnits;
            break;
        case 'militaryPlant':
            militaryPlant.map((item, index) => {
                const selected = (level - 1) === index ? 'selected="selected"' : "";
                structureOptions += `<option value="${item}" data-level="${index + 1}" ${selected}>Военный завод ${index + 1}ур (${parseInt(item * 100)}%)</option>`
            });
            for (_unit in militaryPlantUnits){
                const selected = _unit === unit ? 'selected="selected"' : "";
                unitOptions += `<option value="${_unit}" ${selected}>${militaryPlantUnits[_unit].name}</option>`
            }
            unitsObject = militaryPlantUnits;
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
        <td class="fuel"></td>
        <td class="goldPerHour"></td>
        <td><span class="actions"><i class="fa fa-clone cloneRow" title="Клонировать ряд"></i><i class="fa fa-trash removeRow" title="Удалить"></i></span></td>
    </tr>`);

    row.data({type: unitsObject, structure: type});

    table.append(row);
    calcProdUnit(row);
}

function cloneRow(el){
    let row = el.closest('tr').clone();

    row.insertAfter(el.closest('tr'));
    row.data(el.closest('tr').data());

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
    const units = row.data('type');
    const structureLevel = row.find('.selectedStructure :selected').attr('data-level');
    const structureProdSpeed = row.find('.selectedStructure :selected').val();
    const selectedUnit = row.find('.selectedUnit :selected').val();
    let {time,
        costs: {food = 0, wood = 0, metal = 0, sulfur = 0, fuel = 0, population = 1}
        } =  units[selectedUnit];
    const unitsPerDay = (24 / time  * structureProdSpeed).toFixed(2);

    population = (population * unitsPerDay).toFixed(2);
    food = (food * unitsPerDay / 24).toFixed(2);
    wood = (wood * unitsPerDay / 24).toFixed(2);
    metal = (metal * unitsPerDay / 24).toFixed(2);
    sulfur = (sulfur * unitsPerDay / 24).toFixed(2);
    fuel = (fuel * unitsPerDay / 24).toFixed(2);
    let goldPerHour = (food * 240 + wood * 240 + metal * 550 + sulfur * 600 + fuel * 600) / 1000;

    row.find('.population').text(population);
    row.find('.prodUnitPerHour').text(unitsPerDay);
    row.find('.food').text(food);
    row.find('.wood').text(wood);
    row.find('.metal').text(metal);
    row.find('.sulfur').text(sulfur);
    row.find('.fuel').text(fuel);
    row.find('.goldPerHour').text(goldPerHour.toFixed(2));


    row.find('.actions i').tooltip().on('click', function () {
        $(this).tooltip('hide')
    });

    row.data({unit: selectedUnit, structureLevel});
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
    let fuel = 0;
    let goldPerHour = 0;

    let saveData = [];

    tbody.find('.totalRow').remove();

    tbody.find('tr').each(function(){
        population += parseFloat($(this).find('.population').text());
        prodUnitPerHour += parseFloat($(this).find('.prodUnitPerHour').text());
        food += parseFloat($(this).find('.food').text());
        wood += parseFloat($(this).find('.wood').text());
        metal += parseFloat($(this).find('.metal').text());
        sulfur += parseFloat($(this).find('.sulfur').text());
        fuel += parseFloat($(this).find('.fuel').text());
        goldPerHour += parseFloat($(this).find('.goldPerHour').text());

        const {structure, structureLevel, unit} = $(this).data();
        saveData.push({structure, structureLevel, unit});
    });

    localStorage.setItem('tableData', JSON.stringify(saveData));

    let totalRow = `<tr class="totalRow">
        <td colspan="2" class="text-right">Total:</td>
        <td>${prodUnitPerHour.toFixed(2)}</td>
        <td>${population.toFixed(2)}</td>
        <td>${food.toFixed(2)}</td>
        <td>${wood.toFixed(2)}</td>
        <td>${metal.toFixed(2)}</td>
        <td>${sulfur.toFixed(2)}</td>
        <td>${fuel.toFixed(2)}</td>
        <td>${goldPerHour.toFixed(2)}</td>
    </tr>`;

    tbody.append(totalRow)
}