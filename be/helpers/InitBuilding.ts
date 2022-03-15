import BuildingDatas from "../models/BuildingDatas";
import ResourceDatas from "../models/ResourceDatas";

const buildings = [
    {
        name: 'Gold Mine',
        upgrade: [
            {
                "level": 1,
                "gold": 60,
                "iron": 35,
                "wood": 55,
                "food": 45,
                "generate": 150,
                "time": 2
            },
            {
                "level": 2,
                "gold": 95,
                "iron": 55,
                "wood": 87,
                "food": 71,
                "generate": 176,
                "time": 3
            },
            {
                "level": 3,
                "gold": 120,
                "iron": 70,
                "wood": 110,
                "food": 90,
                "generate": 206,
                "time": 4
            },
            {
                "level": 4,
                "gold": 151,
                "iron": 88,
                "wood": 138,
                "food": 113,
                "generate": 236,
                "time": 5
            },
            {
                "level": 5,
                "gold": 190,
                "iron": 111,
                "wood": 174,
                "food": 142,
                "generate": 270,
                "time": 6
            },
            {
                "level": 6,
                "gold": 240,
                "iron": 140,
                "wood": 220,
                "food": 180,
                "generate": 311,
                "time": 124
            },
            {
                "level": 7,
                "gold": 302,
                "iron": 176,
                "wood": 277,
                "food": 226,
                "generate": 356,
                "time": 156
            },
            {
                "level": 8,
                "gold": 381,
                "iron": 222,
                "wood": 349,
                "food": 285,
                "generate": 405,
                "time": 197
            },
            {
                "level": 9,
                "gold": 480,
                "iron": 280,
                "wood": 440,
                "food": 360,
                "generate": 461,
                "time": 248
            },
            {
                "level": 10,
                "gold": 605,
                "iron": 352,
                "wood": 554,
                "food": 453,
                "generate": 530,
                "time": 313
            },
            {
                "level": 11,
                "gold": 762,
                "iron": 444,
                "wood": 698,
                "food": 571,
                "generate": 605,
                "time": 394
            },
            {
                "level": 12,
                "gold": 960,
                "iron": 560,
                "wood": 880,
                "food": 720,
                "generate": 710,
                "time": 496
            },
            {
                "level": 13,
                "gold": 1210,
                "iron": 706,
                "wood": 1109,
                "food": 907,
                "generate": 806,
                "time": 625
            },
            {
                "level": 14,
                "gold": 1525,
                "iron": 889,
                "wood": 1398,
                "food": 1143,
                "generate": 935,
                "time": 788
            },
            {
                "level": 15,
                "gold": 1921,
                "iron": 1121,
                "wood": 1761,
                "food": 1441,
                "generate": 1055,
                "time": 993
            },
            {
                "level": 16,
                "gold": 2421,
                "iron": 1412,
                "wood": 2219,
                "food": 1816,
                "generate": 1215,
                "time": 1251
            },
            {
                "level": 17,
                "gold": 3051,
                "iron": 1779,
                "wood": 2796,
                "food": 2288,
                "generate": 1425,
                "time": 1576
            },
            {
                "level": 18,
                "gold": 3844,
                "iron": 2242,
                "wood": 3523,
                "food": 2883,
                "generate": 1620,
                "time": 1986
            },
            {
                "level": 19,
                "gold": 4843,
                "iron": 2825,
                "wood": 4440,
                "food": 3632,
                "generate": 1860,
                "time": 2503
            },
            {
                "level": 20,
                "gold": 6103,
                "iron": 3560,
                "wood": 5594,
                "food": 4577,
                "generate": 2141,
                "time": 3153
            },
            {
                "level": 21,
                "gold": 7690,
                "iron": 4485,
                "wood": 7049,
                "food": 5767,
                "generate": 2450,
                "time": 3973
            },
            {
                "level": 22,
                "gold": 9689,
                "iron": 5652,
                "wood": 8882,
                "food": 7267,
                "generate": 2750,
                "time": 5006
            },
            {
                "level": 23,
                "gold": 12208,
                "iron": 7121,
                "wood": 11191,
                "food": 9156,
                "generate": 3251,
                "time": 6308
            },
            {
                "level": 24,
                "gold": 15383,
                "iron": 8973,
                "wood": 14101,
                "food": 11537,
                "generate": 3750,
                "time": 7948
            },
            {
                "level": 25,
                "gold": 19382,
                "iron": 11306,
                "wood": 17767,
                "food": 14537,
                "generate": 4301,
                "time": 10014
            },
            {
                "level": 26,
                "gold": 24422,
                "iron": 14246,
                "wood": 22387,
                "food": 18316,
                "generate": 4935,
                "time": 12618
            },
            {
                "level": 27,
                "gold": 30772,
                "iron": 17950,
                "wood": 28207,
                "food": 23079,
                "generate": 5685,
                "time": 15899
            },
            {
                "level": 28,
                "gold": 38772,
                "iron": 22617,
                "wood": 35541,
                "food": 29079,
                "generate": 6540,
                "time": 20032
            },
            {
                "level": 29,
                "gold": 48853,
                "iron": 28497,
                "wood": 44782,
                "food": 36640,
                "generate": 7500,
                "time": 25241
            },
            {
                "level": 30,
                "gold": 61555,
                "iron": 35907,
                "wood": 56425,
                "food": 46166,
                "generate": 8501,
                "time": 31804
            }
        ]
    },
    {
        name : 'Iron Mine' , 
        upgrade : [
            {
                "level": 1,
                "gold": 60,
                "iron": 35,
                "wood": 55,
                "food": 45,
                "generate": 150,
                "time": 2
            },
            {
                "level": 2,
                "gold": 95,
                "iron": 55,
                "wood": 87,
                "food": 71,
                "generate": 176,
                "time": 3
            },
            {
                "level": 3,
                "gold": 120,
                "iron": 70,
                "wood": 110,
                "food": 90,
                "generate": 206,
                "time": 4
            },
            {
                "level": 4,
                "gold": 151,
                "iron": 88,
                "wood": 138,
                "food": 113,
                "generate": 236,
                "time": 5
            },
            {
                "level": 5,
                "gold": 190,
                "iron": 111,
                "wood": 174,
                "food": 142,
                "generate": 270,
                "time": 6
            },
            {
                "level": 6,
                "gold": 240,
                "iron": 140,
                "wood": 220,
                "food": 180,
                "generate": 311,
                "time": 124
            },
            {
                "level": 7,
                "gold": 302,
                "iron": 176,
                "wood": 277,
                "food": 226,
                "generate": 356,
                "time": 156
            },
            {
                "level": 8,
                "gold": 381,
                "iron": 222,
                "wood": 349,
                "food": 285,
                "generate": 405,
                "time": 197
            },
            {
                "level": 9,
                "gold": 480,
                "iron": 280,
                "wood": 440,
                "food": 360,
                "generate": 461,
                "time": 248
            },
            {
                "level": 10,
                "gold": 605,
                "iron": 352,
                "wood": 554,
                "food": 453,
                "generate": 530,
                "time": 313
            },
            {
                "level": 11,
                "gold": 762,
                "iron": 444,
                "wood": 698,
                "food": 571,
                "generate": 605,
                "time": 394
            },
            {
                "level": 12,
                "gold": 960,
                "iron": 560,
                "wood": 880,
                "food": 720,
                "generate": 710,
                "time": 496
            },
            {
                "level": 13,
                "gold": 1210,
                "iron": 706,
                "wood": 1109,
                "food": 907,
                "generate": 806,
                "time": 625
            },
            {
                "level": 14,
                "gold": 1525,
                "iron": 889,
                "wood": 1398,
                "food": 1143,
                "generate": 935,
                "time": 788
            },
            {
                "level": 15,
                "gold": 1921,
                "iron": 1121,
                "wood": 1761,
                "food": 1441,
                "generate": 1055,
                "time": 993
            },
            {
                "level": 16,
                "gold": 2421,
                "iron": 1412,
                "wood": 2219,
                "food": 1816,
                "generate": 1215,
                "time": 1251
            },
            {
                "level": 17,
                "gold": 3051,
                "iron": 1779,
                "wood": 2796,
                "food": 2288,
                "generate": 1425,
                "time": 1576
            },
            {
                "level": 18,
                "gold": 3844,
                "iron": 2242,
                "wood": 3523,
                "food": 2883,
                "generate": 1620,
                "time": 1986
            },
            {
                "level": 19,
                "gold": 4843,
                "iron": 2825,
                "wood": 4440,
                "food": 3632,
                "generate": 1860,
                "time": 2503
            },
            {
                "level": 20,
                "gold": 6103,
                "iron": 3560,
                "wood": 5594,
                "food": 4577,
                "generate": 2141,
                "time": 3153
            },
            {
                "level": 21,
                "gold": 7690,
                "iron": 4485,
                "wood": 7049,
                "food": 5767,
                "generate": 2450,
                "time": 3973
            },
            {
                "level": 22,
                "gold": 9689,
                "iron": 5652,
                "wood": 8882,
                "food": 7267,
                "generate": 2750,
                "time": 5006
            },
            {
                "level": 23,
                "gold": 12208,
                "iron": 7121,
                "wood": 11191,
                "food": 9156,
                "generate": 3251,
                "time": 6308
            },
            {
                "level": 24,
                "gold": 15383,
                "iron": 8973,
                "wood": 14101,
                "food": 11537,
                "generate": 3750,
                "time": 7948
            },
            {
                "level": 25,
                "gold": 19382,
                "iron": 11306,
                "wood": 17767,
                "food": 14537,
                "generate": 4301,
                "time": 10014
            },
            {
                "level": 26,
                "gold": 24422,
                "iron": 14246,
                "wood": 22387,
                "food": 18316,
                "generate": 4935,
                "time": 12618
            },
            {
                "level": 27,
                "gold": 30772,
                "iron": 17950,
                "wood": 28207,
                "food": 23079,
                "generate": 5685,
                "time": 15899
            },
            {
                "level": 28,
                "gold": 38772,
                "iron": 22617,
                "wood": 35541,
                "food": 29079,
                "generate": 6540,
                "time": 20032
            },
            {
                "level": 29,
                "gold": 48853,
                "iron": 28497,
                "wood": 44782,
                "food": 36640,
                "generate": 7500,
                "time": 25241
            },
            {
                "level": 30,
                "gold": 61555,
                "iron": 35907,
                "wood": 56425,
                "food": 46166,
                "generate": 8501,
                "time": 31804
            }
        ]
    },
    {
        name : 'Lumberjacks',
        upgrade : [
            {
                "level": 1,
                "gold": 65,
                "iron": 55,
                "wood": 35,
                "food": 40,
                "generate": 150,
                "time": 2
            },
            {
                "level": 2,
                "gold": 103,
                "iron": 87,
                "wood": 55,
                "food": 63,
                "generate": 176,
                "time": 3
            },
            {
                "level": 3,
                "gold": 130,
                "iron": 110,
                "wood": 70,
                "food": 80,
                "generate": 206,
                "time": 4
            },
            {
                "level": 4,
                "gold": 163,
                "iron": 138,
                "wood": 88,
                "food": 100,
                "generate": 236,
                "time": 5
            },
            {
                "level": 5,
                "gold": 206,
                "iron": 174,
                "wood": 111,
                "food": 127,
                "generate": 270,
                "time": 6
            },
            {
                "level": 6,
                "gold": 260,
                "iron": 220,
                "wood": 140,
                "food": 160,
                "generate": 311,
                "time": 122
            },
            {
                "level": 7,
                "gold": 327,
                "iron": 277,
                "wood": 176,
                "food": 201,
                "generate": 356,
                "time": 154
            },
            {
                "level": 8,
                "gold": 412,
                "iron": 349,
                "wood": 222,
                "food": 254,
                "generate": 405,
                "time": 194
            },
            {
                "level": 9,
                "gold": 520,
                "iron": 440,
                "wood": 280,
                "food": 320,
                "generate": 461,
                "time": 245
            },
            {
                "level": 10,
                "gold": 655,
                "iron": 554,
                "wood": 352,
                "food": 403,
                "generate": 530,
                "time": 309
            },
            {
                "level": 11,
                "gold": 826,
                "iron": 698,
                "wood": 444,
                "food": 508,
                "generate": 605,
                "time": 389
            },
            {
                "level": 12,
                "gold": 1040,
                "iron": 880,
                "wood": 560,
                "food": 640,
                "generate": 710,
                "time": 490
            },
            {
                "level": 13,
                "gold": 1311,
                "iron": 1109,
                "wood": 706,
                "food": 807,
                "generate": 806,
                "time": 617
            },
            {
                "level": 14,
                "gold": 1652,
                "iron": 1398,
                "wood": 889,
                "food": 1016,
                "generate": 935,
                "time": 778
            },
            {
                "level": 15,
                "gold": 2081,
                "iron": 1761,
                "wood": 1121,
                "food": 1281,
                "generate": 1055,
                "time": 980
            },
            {
                "level": 16,
                "gold": 2623,
                "iron": 2219,
                "wood": 1412,
                "food": 1614,
                "generate": 1215,
                "time": 1235
            },
            {
                "level": 17,
                "gold": 3305,
                "iron": 2796,
                "wood": 1779,
                "food": 2034,
                "generate": 1425,
                "time": 1556
            },
            {
                "level": 18,
                "gold": 4164,
                "iron": 3523,
                "wood": 2242,
                "food": 2562,
                "generate": 1620,
                "time": 1961
            },
            {
                "level": 19,
                "gold": 5247,
                "iron": 4440,
                "wood": 2825,
                "food": 3229,
                "generate": 1860,
                "time": 2470
            },
            {
                "level": 20,
                "gold": 6611,
                "iron": 5594,
                "wood": 3560,
                "food": 4068,
                "generate": 2141,
                "time": 3113
            },
            {
                "level": 21,
                "gold": 8330,
                "iron": 7049,
                "wood": 4485,
                "food": 5126,
                "generate": 2450,
                "time": 3922
            },
            {
                "level": 22,
                "gold": 10497,
                "iron": 8882,
                "wood": 5652,
                "food": 6459,
                "generate": 2750,
                "time": 4942
            },
            {
                "level": 23,
                "gold": 13226,
                "iron": 11191,
                "wood": 7121,
                "food": 8139,
                "generate": 3251,
                "time": 6226
            },
            {
                "level": 24,
                "gold": 16665,
                "iron": 14101,
                "wood": 8973,
                "food": 10255,
                "generate": 3750,
                "time": 7845
            },
            {
                "level": 25,
                "gold": 20997,
                "iron": 17767,
                "wood": 11306,
                "food": 12921,
                "generate": 4301,
                "time": 9885
            },
            {
                "level": 26,
                "gold": 26457,
                "iron": 22387,
                "wood": 14246,
                "food": 16281,
                "generate": 4935,
                "time": 12455
            },
            {
                "level": 27,
                "gold": 33336,
                "iron": 28207,
                "wood": 17950,
                "food": 20514,
                "generate": 5685,
                "time": 15694
            },
            {
                "level": 28,
                "gold": 42003,
                "iron": 35541,
                "wood": 22617,
                "food": 25848,
                "generate": 6540,
                "time": 19774
            },
            {
                "level": 29,
                "gold": 52924,
                "iron": 44782,
                "wood": 28497,
                "food": 32569,
                "generate": 7500,
                "time": 24915
            },
            {
                "level": 30,
                "gold": 100000,
                "iron": 56425,
                "wood": 35907,
                "food": 41037,
                "generate": 8501,
                "time": 31393
            }
        ]
    },
    {
        name : "Farms",
        upgrade :[
            {
                "level": 1,
                "gold": 55,
                "iron": 50,
                "wood": 35,
                "food": 70,
                "generate": 150,
                "time": 2
            },
            {
                "level": 2,
                "gold": 87,
                "iron": 79,
                "wood": 55,
                "food": 111,
                "generate": 176,
                "time": 3
            },
            {
                "level": 3,
                "gold": 110,
                "iron": 100,
                "wood": 70,
                "food": 140,
                "generate": 206,
                "time": 4
            },
            {
                "level": 4,
                "gold": 138,
                "iron": 126,
                "wood": 88,
                "food": 176,
                "generate": 236,
                "time": 5
            },
            {
                "level": 5,
                "gold": 174,
                "iron": 158,
                "wood": 111,
                "food": 222,
                "generate": 270,
                "time": 6
            },
            {
                "level": 6,
                "gold": 220,
                "iron": 200,
                "wood": 140,
                "food": 280,
                "generate": 311,
                "time": 122
            },
            {
                "level": 7,
                "gold": 277,
                "iron": 252,
                "wood": 176,
                "food": 352,
                "generate": 356,
                "time": 154
            },
            {
                "level": 8,
                "gold": 349,
                "iron": 317,
                "wood": 222,
                "food": 444,
                "generate": 405,
                "time": 194
            },
            {
                "level": 9,
                "gold": 440,
                "iron": 400,
                "wood": 280,
                "food": 560,
                "generate": 461,
                "time": 245
            },
            {
                "level": 10,
                "gold": 554,
                "iron": 504,
                "wood": 352,
                "food": 705,
                "generate": 530,
                "time": 309
            },
            {
                "level": 11,
                "gold": 698,
                "iron": 635,
                "wood": 444,
                "food": 889,
                "generate": 605,
                "time": 389
            },
            {
                "level": 12,
                "gold": 880,
                "iron": 800,
                "wood": 560,
                "food": 1120,
                "generate": 710,
                "time": 490
            },
            {
                "level": 13,
                "gold": 1109,
                "iron": 1008,
                "wood": 706,
                "food": 1412,
                "generate": 806,
                "time": 617
            },
            {
                "level": 14,
                "gold": 1398,
                "iron": 1271,
                "wood": 889,
                "food": 1779,
                "generate": 935,
                "time": 778
            },
            {
                "level": 15,
                "gold": 1761,
                "iron": 1601,
                "wood": 1121,
                "food": 2242,
                "generate": 1055,
                "time": 980
            },
            {
                "level": 16,
                "gold": 2219,
                "iron": 2017,
                "wood": 1412,
                "food": 2825,
                "generate": 1215,
                "time": 1235
            },
            {
                "level": 17,
                "gold": 2796,
                "iron": 2542,
                "wood": 1779,
                "food": 3559,
                "generate": 1425,
                "time": 1556
            },
            {
                "level": 18,
                "gold": 3523,
                "iron": 3203,
                "wood": 2242,
                "food": 4485,
                "generate": 1620,
                "time": 1961
            },
            {
                "level": 19,
                "gold": 4440,
                "iron": 4036,
                "wood": 2825,
                "food": 5651,
                "generate": 1860,
                "time": 2470
            },
            {
                "level": 20,
                "gold": 5594,
                "iron": 5086,
                "wood": 3560,
                "food": 7120,
                "generate": 2141,
                "time": 3113
            },
            {
                "level": 21,
                "gold": 7049,
                "iron": 6408,
                "wood": 4485,
                "food": 8971,
                "generate": 2450,
                "time": 3922
            },
            {
                "level": 22,
                "gold": 8882,
                "iron": 8074,
                "wood": 5652,
                "food": 11304,
                "generate": 2750,
                "time": 4942
            },
            {
                "level": 23,
                "gold": 11191,
                "iron": 10174,
                "wood": 7121,
                "food": 14243,
                "generate": 3251,
                "time": 6226
            },
            {
                "level": 24,
                "gold": 14101,
                "iron": 12819,
                "wood": 8973,
                "food": 17946,
                "generate": 3750,
                "time": 7845
            },
            {
                "level": 25,
                "gold": 17767,
                "iron": 16152,
                "wood": 11306,
                "food": 22613,
                "generate": 4301,
                "time": 9885
            },
            {
                "level": 26,
                "gold": 22387,
                "iron": 20351,
                "wood": 14246,
                "food": 28492,
                "generate": 4935,
                "time": 12455
            },
            {
                "level": 27,
                "gold": 28207,
                "iron": 25643,
                "wood": 17950,
                "food": 35900,
                "generate": 5685,
                "time": 15694
            },
            {
                "level": 28,
                "gold": 35541,
                "iron": 32310,
                "wood": 22617,
                "food": 45234,
                "generate": 6540,
                "time": 19774
            },
            {
                "level": 29,
                "gold": 44782,
                "iron": 40711,
                "wood": 28497,
                "food": 56995,
                "generate": 7500,
                "time": 24915
            },
            {
                "level": 30,
                "gold": 56425,
                "iron": 51296,
                "wood": 35907,
                "food": 71814,
                "generate": 8501,
                "time": 31393
            }
        ]
    }
]

const resources = [
    {
        name : "Gold"
    },
    {
        name : "Iron"
    },
    {
        name : "Wood"
    },
    {
        name : 'Food'
    }
]
async function InitBuilding() {
    for (let index = 0; index < buildings.length; index++) {
        const building = buildings[index];
        const ishave = await BuildingDatas.findOne({name : building.name})
        if(!ishave) {
            await BuildingDatas.create(building)
        }
    }
    for (let index = 0; index < resources.length; index++) {
        const resouce = resources[index];
        const ishave = await ResourceDatas.findOne({name : resouce.name})
        if(!ishave) {
            await ResourceDatas.create(resouce)
        }
    }
    console.log('inited');
    
}

InitBuilding()