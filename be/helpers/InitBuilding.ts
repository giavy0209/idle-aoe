import UnitDatas from "models/UnitDatas";
import BuildingDatas from "../models/BuildingDatas";
import ResourceDatas from "../models/ResourceDatas";

const buildings = [
    {
        name: 'Gold Mine',
        resource : 'Gold',
        upgrade : [
            {
                "level": 0,
                "generate": 100,
            },
            {
                "level": 1,
                "gold": 30,
                "iron": 65,
                "wood": 40,
                "food": 45,
                "generate": 150,
                "time": 2
            },
            {
                "level": 2,
                "gold": 47,
                "iron": 103,
                "wood": 63,
                "food": 71,
                "generate": 176,
                "time": 3
            },
            {
                "level": 3,
                "gold": 60,
                "iron": 130,
                "wood": 80,
                "food": 90,
                "generate": 206,
                "time": 4
            },
            {
                "level": 4,
                "gold": 75,
                "iron": 163,
                "wood": 100,
                "food": 113,
                "generate": 236,
                "time": 5
            },
            {
                "level": 5,
                "gold": 95,
                "iron": 206,
                "wood": 127,
                "food": 142,
                "generate": 270,
                "time": 6
            },
            {
                "level": 6,
                "gold": 120,
                "iron": 260,
                "wood": 160,
                "food": 180,
                "generate": 311,
                "time": 120
            },
            {
                "level": 7,
                "gold": 151,
                "iron": 327,
                "wood": 201,
                "food": 226,
                "generate": 356,
                "time": 151
            },
            {
                "level": 8,
                "gold": 190,
                "iron": 412,
                "wood": 254,
                "food": 285,
                "generate": 405,
                "time": 190
            },
            {
                "level": 9,
                "gold": 240,
                "iron": 520,
                "wood": 320,
                "food": 360,
                "generate": 461,
                "time": 240
            },
            {
                "level": 10,
                "gold": 302,
                "iron": 655,
                "wood": 403,
                "food": 453,
                "generate": 530,
                "time": 302
            },
            {
                "level": 11,
                "gold": 381,
                "iron": 826,
                "wood": 508,
                "food": 571,
                "generate": 605,
                "time": 381
            },
            {
                "level": 12,
                "gold": 480,
                "iron": 1040,
                "wood": 640,
                "food": 720,
                "generate": 710,
                "time": 480
            },
            {
                "level": 13,
                "gold": 605,
                "iron": 1311,
                "wood": 807,
                "food": 907,
                "generate": 806,
                "time": 605
            },
            {
                "level": 14,
                "gold": 762,
                "iron": 1652,
                "wood": 1016,
                "food": 1143,
                "generate": 935,
                "time": 763
            },
            {
                "level": 15,
                "gold": 960,
                "iron": 2081,
                "wood": 1281,
                "food": 1441,
                "generate": 1055,
                "time": 961
            },
            {
                "level": 16,
                "gold": 1210,
                "iron": 2623,
                "wood": 1614,
                "food": 1816,
                "generate": 1215,
                "time": 1211
            },
            {
                "level": 17,
                "gold": 1525,
                "iron": 3305,
                "wood": 2034,
                "food": 2288,
                "generate": 1425,
                "time": 1525
            },
            {
                "level": 18,
                "gold": 1922,
                "iron": 4164,
                "wood": 2562,
                "food": 2883,
                "generate": 1620,
                "time": 1922
            },
            {
                "level": 19,
                "gold": 2421,
                "iron": 5247,
                "wood": 3229,
                "food": 3632,
                "generate": 1860,
                "time": 2422
            },
            {
                "level": 20,
                "gold": 3051,
                "iron": 6611,
                "wood": 4068,
                "food": 4577,
                "generate": 2141,
                "time": 3052
            },
            {
                "level": 21,
                "gold": 3845,
                "iron": 8330,
                "wood": 5126,
                "food": 5767,
                "generate": 2450,
                "time": 3845
            },
            {
                "level": 22,
                "gold": 4844,
                "iron": 10497,
                "wood": 6459,
                "food": 7267,
                "generate": 2750,
                "time": 4845
            },
            {
                "level": 23,
                "gold": 6104,
                "iron": 13226,
                "wood": 8139,
                "food": 9156,
                "generate": 3251,
                "time": 6104
            },
            {
                "level": 24,
                "gold": 7691,
                "iron": 16665,
                "wood": 10255,
                "food": 11537,
                "generate": 3750,
                "time": 7691
            },
            {
                "level": 25,
                "gold": 9691,
                "iron": 20997,
                "wood": 12921,
                "food": 14537,
                "generate": 4301,
                "time": 9691
            },
            {
                "level": 26,
                "gold": 12211,
                "iron": 26457,
                "wood": 16281,
                "food": 18316,
                "generate": 4935,
                "time": 12211
            },
            {
                "level": 27,
                "gold": 15386,
                "iron": 33336,
                "wood": 20514,
                "food": 23079,
                "generate": 5685,
                "time": 15386
            },
            {
                "level": 28,
                "gold": 19386,
                "iron": 42003,
                "wood": 25848,
                "food": 29079,
                "generate": 6540,
                "time": 19386
            },
            {
                "level": 29,
                "gold": 24426,
                "iron": 52924,
                "wood": 32569,
                "food": 36640,
                "generate": 7500,
                "time": 24427
            },
            {
                "level": 30,
                "gold": 30777,
                "iron": 66685,
                "wood": 41037,
                "food": 46166,
                "generate": 8501,
                "time": 30778
            }
        ]
    },
    {
        name : 'Iron Mine' , 
        resource : 'Iron',
        upgrade : [
            {
                "level": 0,
                "generate": 100,
            },
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
        resource : 'Wood',
        upgrade : [
            {
                "level": 0,
                "generate": 100,
            },
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
        resource : 'Food',
        upgrade :[
            {
                "level": 0,
                "generate": 100,
            },
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
    },
    {
        name : "Barracks",
        order : 4,
        upgrade : [
            {
                "level": 0,
                "generate": 0,
            },
            {
                "level": 1,
                "gold": 100,
                "iron": 40,
                "wood": 120,
                "food": 40,
                "generate": 9.09,
                "time": 3
            },
            {
                "level": 2,
                "gold": 158,
                "iron": 63,
                "wood": 190,
                "food": 63,
                "generate": 16.67,
                "time": 4
            },
            {
                "level": 3,
                "gold": 250,
                "iron": 100,
                "wood": 301,
                "food": 100,
                "generate": 23.08,
                "time": 6
            },
            {
                "level": 4,
                "gold": 395,
                "iron": 158,
                "wood": 475,
                "food": 158,
                "generate": 28.57,
                "time": 8
            },
            {
                "level": 5,
                "gold": 624,
                "iron": 249,
                "wood": 750,
                "food": 249,
                "generate": 33.33,
                "time": 10
            },
            {
                "level": 6,
                "gold": 986,
                "iron": 393,
                "wood": 1185,
                "food": 394,
                "generate": 37.5,
                "time": 240
            },
            {
                "level": 7,
                "gold": 1558,
                "iron": 621,
                "wood": 1873,
                "food": 622,
                "generate": 41.18,
                "time": 324
            },
            {
                "level": 8,
                "gold": 2025,
                "iron": 808,
                "wood": 2435,
                "food": 809,
                "generate": 44.44,
                "time": 437
            },
            {
                "level": 9,
                "gold": 2553,
                "iron": 1019,
                "wood": 3067,
                "food": 1019,
                "generate": 47.37,
                "time": 590
            },
            {
                "level": 10,
                "gold": 3218,
                "iron": 1283,
                "wood": 3867,
                "food": 1284,
                "generate": 50,
                "time": 768
            },
            {
                "level": 11,
                "gold": 4055,
                "iron": 1617,
                "wood": 4871,
                "food": 1618,
                "generate": 52.38,
                "time": 998
            },
            {
                "level": 12,
                "gold": 5110,
                "iron": 2039,
                "wood": 6138,
                "food": 2040,
                "generate": 54.55,
                "time": 1297
            },
            {
                "level": 13,
                "gold": 6437,
                "iron": 2568,
                "wood": 7735,
                "food": 2570,
                "generate": 56.52,
                "time": 1686
            },
            {
                "level": 14,
                "gold": 8111,
                "iron": 3236,
                "wood": 9746,
                "food": 3239,
                "generate": 58.33,
                "time": 2192
            },
            {
                "level": 15,
                "gold": 10221,
                "iron": 4077,
                "wood": 12281,
                "food": 4081,
                "generate": 60,
                "time": 2850
            },
            {
                "level": 16,
                "gold": 12878,
                "iron": 5139,
                "wood": 15473,
                "food": 5141,
                "generate": 61.54,
                "time": 3705
            },
            {
                "level": 17,
                "gold": 16227,
                "iron": 6474,
                "wood": 19496,
                "food": 6478,
                "generate": 62.96,
                "time": 4817
            },
            {
                "level": 18,
                "gold": 20446,
                "iron": 8158,
                "wood": 24565,
                "food": 8163,
                "generate": 64.29,
                "time": 6262
            },
            {
                "level": 19,
                "gold": 25763,
                "iron": 10279,
                "wood": 30953,
                "food": 10285,
                "generate": 65.52,
                "time": 8140
            },
            {
                "level": 20,
                "gold": 32461,
                "iron": 12951,
                "wood": 39001,
                "food": 12959,
                "generate": 66.67,
                "time": 10583
            }
        ]
    },
    {
        name : 'Archery Range',
        order : 2,
        upgrade : [
            {
                "level": 0,
                "generate": 0,
            },
            {
                "level": 1,
                "gold": 50,
                "iron": 70,
                "wood": 60,
                "food": 80,
                "generate": 9.09,
                "time": 3
            },
            {
                "level": 2,
                "gold": 79,
                "iron": 111,
                "wood": 95,
                "food": 127,
                "generate": 16.67,
                "time": 4
            },
            {
                "level": 3,
                "gold": 125,
                "iron": 175,
                "wood": 150,
                "food": 200,
                "generate": 23.08,
                "time": 6
            },
            {
                "level": 4,
                "gold": 197,
                "iron": 277,
                "wood": 237,
                "food": 317,
                "generate": 28.57,
                "time": 8
            },
            {
                "level": 5,
                "gold": 311,
                "iron": 437,
                "wood": 374,
                "food": 317,
                "generate": 33.33,
                "time": 10
            },
            {
                "level": 6,
                "gold": 492,
                "iron": 690,
                "wood": 591,
                "food": 790,
                "generate": 37.5,
                "time": 240
            },
            {
                "level": 7,
                "gold": 777,
                "iron": 1091,
                "wood": 933,
                "food": 1249,
                "generate": 41.18,
                "time": 324
            },
            {
                "level": 8,
                "gold": 1010,
                "iron": 1418,
                "wood": 1213,
                "food": 1623,
                "generate": 44.44,
                "time": 437
            },
            {
                "level": 9,
                "gold": 1273,
                "iron": 1787,
                "wood": 1529,
                "food": 2045,
                "generate": 47.37,
                "time": 590
            },
            {
                "level": 10,
                "gold": 1604,
                "iron": 2252,
                "wood": 1926,
                "food": 2578,
                "generate": 50,
                "time": 768
            },
            {
                "level": 11,
                "gold": 2021,
                "iron": 2838,
                "wood": 2427,
                "food": 3247,
                "generate": 52.38,
                "time": 998
            },
            {
                "level": 12,
                "gold": 2548,
                "iron": 3577,
                "wood": 3060,
                "food": 4092,
                "generate": 54.55,
                "time": 1297
            },
            {
                "level": 13,
                "gold": 3210,
                "iron": 4506,
                "wood": 3855,
                "food": 5157,
                "generate": 56.52,
                "time": 1686
            },
            {
                "level": 14,
                "gold": 4045,
                "iron": 5678,
                "wood": 4858,
                "food": 6498,
                "generate": 58.33,
                "time": 2192
            },
            {
                "level": 15,
                "gold": 5097,
                "iron": 7155,
                "wood": 6121,
                "food": 8187,
                "generate": 60,
                "time": 2850
            },
            {
                "level": 16,
                "gold": 6423,
                "iron": 9014,
                "wood": 7711,
                "food": 10315,
                "generate": 61.54,
                "time": 3705
            },
            {
                "level": 17,
                "gold": 8093,
                "iron": 11359,
                "wood": 9717,
                "food": 12998,
                "generate": 62.96,
                "time": 4817
            },
            {
                "level": 18,
                "gold": 10197,
                "iron": 14313,
                "wood": 12244,
                "food": 16377,
                "generate": 64.29,
                "time": 6262
            },
            {
                "level": 19,
                "gold": 12848,
                "iron": 18034,
                "wood": 15428,
                "food": 20635,
                "generate": 65.52,
                "time": 8140
            },
            {
                "level": 20,
                "gold": 16189,
                "iron": 22722,
                "wood": 19439,
                "food": 26000,
                "generate": 66.67,
                "time": 10583
            }
        ]
    },
    {
        name : "Stables",
        order : 3,
        upgrade : [
            {
                "level": 0,
                "generate": 0,
            },
            {
                "level": 1,
                "gold": 300,
                "iron": 245,
                "wood": 255,
                "food": 235,
                "generate": 9.09,
                "time": 24
            },
            {
                "level": 2,
                "gold": 476,
                "iron": 388,
                "wood": 404,
                "food": 373,
                "generate": 16.67,
                "time": 48
            },
            {
                "level": 3,
                "gold": 600,
                "iron": 490,
                "wood": 510,
                "food": 470,
                "generate": 23.08,
                "time": 72
            },
            {
                "level": 4,
                "gold": 756,
                "iron": 617,
                "wood": 642,
                "food": 592,
                "generate": 28.57,
                "time": 302
            },
            {
                "level": 5,
                "gold": 952,
                "iron": 778,
                "wood": 809,
                "food": 746,
                "generate": 33.33,
                "time": 381
            },
            {
                "level": 6,
                "gold": 1200,
                "iron": 980,
                "wood": 1020,
                "food": 940,
                "generate": 37.5,
                "time": 480
            },
            {
                "level": 7,
                "gold": 1512,
                "iron": 1235,
                "wood": 1285,
                "food": 1184,
                "generate": 41.18,
                "time": 605
            },
            {
                "level": 8,
                "gold": 1905,
                "iron": 1556,
                "wood": 1619,
                "food": 1492,
                "generate": 44.44,
                "time": 762
            },
            {
                "level": 9,
                "gold": 2401,
                "iron": 1961,
                "wood": 2041,
                "food": 1881,
                "generate": 47.37,
                "time": 960
            },
            {
                "level": 10,
                "gold": 3025,
                "iron": 2470,
                "wood": 2571,
                "food": 2370,
                "generate": 50,
                "time": 1210
            },
            {
                "level": 11,
                "gold": 3812,
                "iron": 3113,
                "wood": 3240,
                "food": 2986,
                "generate": 52.38,
                "time": 1525
            },
            {
                "level": 12,
                "gold": 4803,
                "iron": 3922,
                "wood": 4083,
                "food": 3762,
                "generate": 54.55,
                "time": 1921
            },
            {
                "level": 13,
                "gold": 6052,
                "iron": 4942,
                "wood": 5144,
                "food": 4741,
                "generate": 56.52,
                "time": 2421
            },
            {
                "level": 14,
                "gold": 7626,
                "iron": 6228,
                "wood": 6482,
                "food": 5973,
                "generate": 58.33,
                "time": 3050
            },
            {
                "level": 15,
                "gold": 9609,
                "iron": 7847,
                "wood": 8167,
                "food": 7527,
                "generate": 60,
                "time": 3844
            },
            {
                "level": 16,
                "gold": 12107,
                "iron": 9887,
                "wood": 10291,
                "food": 9484,
                "generate": 61.54,
                "time": 4843
            },
            {
                "level": 17,
                "gold": 15255,
                "iron": 12458,
                "wood": 12966,
                "food": 11949,
                "generate": 62.96,
                "time": 6102
            },
            {
                "level": 18,
                "gold": 19221,
                "iron": 15697,
                "wood": 16338,
                "food": 15056,
                "generate": 64.29,
                "time": 7689
            },
            {
                "level": 19,
                "gold": 24219,
                "iron": 19779,
                "wood": 20586,
                "food": 18971,
                "generate": 65.52,
                "time": 9688
            },
            {
                "level": 20,
                "gold": 30516,
                "iron": 24921,
                "wood": 25938,
                "food": 23904,
                "generate": 66.67,
                "time": 12206
            }
        ]
    },
    {
        name : "Workshop",
        order : 1,
        upgrade : [
            {
                "level": 0,
                "generate": 0,
            },
            {
                "level": 1,
                "gold": 155,
                "iron": 265,
                "wood": 305,
                "food": 235,
                "generate": 9.09,
                "time": 180
            },
            {
                "level": 2,
                "gold": 246,
                "iron": 420,
                "wood": 484,
                "food": 373,
                "generate": 16.67,
                "time": 286
            },
            {
                "level": 3,
                "gold": 310,
                "iron": 530,
                "wood": 610,
                "food": 470,
                "generate": 23.08,
                "time": 360
            },
            {
                "level": 4,
                "gold": 390,
                "iron": 667,
                "wood": 768,
                "food": 592,
                "generate": 28.57,
                "time": 454
            },
            {
                "level": 5,
                "gold": 492,
                "iron": 841,
                "wood": 968,
                "food": 746,
                "generate": 33.33,
                "time": 572
            },
            {
                "level": 6,
                "gold": 620,
                "iron": 1060,
                "wood": 1220,
                "food": 940,
                "generate": 37.5,
                "time": 720
            },
            {
                "level": 7,
                "gold": 781,
                "iron": 1336,
                "wood": 1537,
                "food": 1184,
                "generate": 41.18,
                "time": 907
            },
            {
                "level": 8,
                "gold": 984,
                "iron": 1683,
                "wood": 1937,
                "food": 1492,
                "generate": 44.44,
                "time": 1143
            },
            {
                "level": 9,
                "gold": 1240,
                "iron": 2121,
                "wood": 2441,
                "food": 1881,
                "generate": 47.37,
                "time": 1441
            },
            {
                "level": 10,
                "gold": 1563,
                "iron": 2672,
                "wood": 3076,
                "food": 2370,
                "generate": 50,
                "time": 1815
            },
            {
                "level": 11,
                "gold": 1969,
                "iron": 3367,
                "wood": 3875,
                "food": 2986,
                "generate": 52.38,
                "time": 2287
            },
            {
                "level": 12,
                "gold": 2481,
                "iron": 4243,
                "wood": 4883,
                "food": 3762,
                "generate": 54.55,
                "time": 2882
            },
            {
                "level": 13,
                "gold": 3127,
                "iron": 5346,
                "wood": 6153,
                "food": 4741,
                "generate": 56.52,
                "time": 3631
            },
            {
                "level": 14,
                "gold": 3940,
                "iron": 6736,
                "wood": 7753,
                "food": 5973,
                "generate": 58.33,
                "time": 4576
            },
            {
                "level": 15,
                "gold": 4964,
                "iron": 8487,
                "wood": 9769,
                "food": 7527,
                "generate": 60,
                "time": 5765
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

const units = [
    {
        "name": "Pikeman",
        "time": 180,
        "speed": 10,
        "cargo": 25,
        "life": 40,
        "range": 2,
        description : "The Pikeman is most efficient against Archers and Cavalry and has the highest carrying capacity of all Infantry units. The Pikemen's range is 2, that's why they are so useful in the battles.",
        building : 'Barracks',
        population : 1,
        "resource": {
            "gold": 30,
            "iron": 30,
            "wood": 50,
            "food": 15
        },
        "strength": {
            "barrack": 20,
            "archer": 40,
            "stable": 60,
            "workshop": 20
        },
    },
    {
        "name": "Swordsman",
        "time": 240,
        "speed": 15,
        "cargo": 15,
        "life": 80,
        "range": 1,
        description : 'The Swordsman is equally strong against all unit types, but it costs a lot of Iron. It has average carrying capacity and a lot of health.',
        building : 'Barracks',
        population : 1,
        "resource": {
            "gold": 30,
            "iron": 65,
            "wood": 30,
            "food": 15
        },
        "strength": {
            "barrack": 35,
            "archer": 35,
            "stable": 35,
            "workshop": 35
        },
    },
    {
        "name": "Axeman",
        "time": 180,
        "speed": 10,
        "cargo": 10,
        "life": 70,
        "range": 1,
        description : 'The Axeman is very powerful against Infantry and Archers, but has a small carrying capacity. The resources it requires the most are Food and Iron.',
        building : 'Barracks',
        population : 1,
        "resource": {
            "gold": 10,
            "iron": 45,
            "wood": 35,
            "food": 50
        },
        "strength": {
            "barrack": 70,
            "archer": 70,
            "stable": 20,
            "workshop": 20
        }
    },
    {
        "name": "Maceman",
        "time": 180,
        "speed": 12,
        "cargo": 20,
        "life": 60,
        "range": 1,
        description : 'The Maceman is strong versus Cavalry and Siege machines and has good Carrying capacity. It requires more Food and Gold than other resources to train.',
        building : 'Barracks',
        population : 1,
        "resource": {
            "gold": 45,
            "iron": 10,
            "wood": 30,
            "food": 50
        },
        "strength": {
            "barrack": 20,
            "archer": 20,
            "stable": 60,
            "workshop": 70
        }
    },
    {
        "name": "Shortbow archer",
        "time": 144,
        "speed": 12,
        "cargo": 25,
        "life": 40,
        "range": 3,
        description : 'This is the basic Archer unit. It is cheap, can be trained quickly, and is most powerful against enemy Infantry.',
        building : 'Archery Range',
        population : 1,
        "resource": {
            "gold": 25,
            "iron": 35,
            "wood": 35,
            "food": 20
        },
        "strength": {
            "barrack": 60,
            "archer": 10,
            "stable": 20,
            "workshop": 40
        }
    },
    {
        "name": "Longbow archer",
        "time": 210,
        "speed": 12,
        "cargo": 15,
        "life": 40,
        "range": 4,
        description : 'The Longbow archer is vital for every strong army. It takes only 1 population, it is strong against Cavalry and Siege machines, and it takes more Wood and Gold than other resources to build.',
        building : 'Archery Range',
        population : 1,
        "resource": {
            "gold": 50,
            "iron": 10,
            "wood": 70,
            "food": 20
        },
        "strength": {
            "barrack": 20,
            "archer": 25,
            "stable": 35,
            "workshop": 40
        }
    },
    {
        "name": "Crossbow archer",
        "time": 180,
        "speed": 14,
        "cargo": 20,
        "life": 40,
        "range": 4,
        description : "Another must have in every army unit - it does most damage to Infantry and Archers, it's range is a big advantage, but requires a lot of Gold and Wood.",
        building : 'Archery Range',
        population : 1,
        "resource": {
            "gold": 50,
            "iron": 25,
            "wood": 40,
            "food": 20
        },
        "strength": {
            "barrack": 40,
            "archer": 35,
            "stable": 25,
            "workshop": 20
        }
    },
    {
        "name": "Quickwalker",
        "time": 240,
        "speed": 5,
        "cargo": 2,
        "life": 80,
        "range": 1,
        description : 'The Quickwalkers are really fast, but only light armored. They are not very powerful in a battle, as their main use is to Spy on enemies and get information about their castles.',
        building : 'Stables',
        population : 2,
        "resource": {
            "gold": 10,
            "iron": 40,
            "wood": 45,
            "food": 50
        },
        "strength": {
            "barrack": 20,
            "archer": 20,
            "stable": 20,
            "workshop": 5
        }
    },
    {
        "name": "Light Cavalry",
        "time": 360,
        "speed": 6,
        "cargo": 90,
        "life": 320,
        "range": 1,
        description : 'The Light Cavalry is a very fast unit with a high carrying capacity, making it perfect for attacks with the purpose of stealing a lot of resources. They are strong against all unit types, but are the most powerful against Archers and Infantry. They require a lot of Food to be trained.',
        building : 'Stables',
        population : 4,
        "resource": {
            "gold": 120,
            "iron": 120,
            "wood": 50,
            "food": 250
        },
        "strength": {
            "barrack": 180,
            "archer": 200,
            "stable": 100,
            "workshop": 150
        }
    },
    {
        "name": "Heavy Cavalry",
        "time": 540,
        "speed": 7,
        "cargo": 45,
        "life": 500,
        "range": 1,
        description : 'The Heavy Cavalry is an exceptionally tough and powerful unit. It is very strong against Infantry, Archers and Siege machines. Unfortunately it is expensive to train and takes up a lot of population.',
        building : 'Stables',
        population : 6,
        "resource": {
            "gold": 300,
            "iron": 250,
            "wood": 100,
            "food": 100
        },
        "strength": {
            "barrack": 250,
            "archer": 250,
            "stable": 150,
            "workshop": 250
        }
    },
    {
        "name": "Ballistician",
        "time": 810,
        "speed": 25,
        "cargo": 15,
        "life": 300,
        "range": 5,
        description : 'The Ballistician has a long range of 5 and is most powerful against Cavalry, Infantry and Archers. It is very useful to have a bunch of those in your army, but unfortunately it takes-up a lot of population (6) and costs a lot of Wood and Food to train.',
        building : 'Workshop',
        population : 6,
        "resource": {
            "gold": 94,
            "iron": 188,
            "wood": 469,
            "food": 375
        },
        "strength": {
            "barrack": 150,
            "archer": 150,
            "stable": 150,
            "workshop": 70
        }
    },
    {
        "name": "Catapult",
        "time": 900,
        "speed": 30,
        "cargo": 15,
        "life": 400,
        "range": 5,
        description : `The Catapult also has a long range of 5. It does the most damage to Infantry and Archers. It is quite expensive, especially Gold and Iron, but it's worth it.`,
        building : 'Workshop',
        population : 8,
        "resource": {
            "gold": 647,
            "iron": 563,
            "wood": 375,
            "food": 188
        },
        "strength": {
            "barrack": 180,
            "archer": 180,
            "stable": 150,
            "workshop": 150
        }
    },
    {
        "name": "Trebuchet",
        "time": 1008,
        "speed": 30,
        "cargo": 8,
        "life": 500,
        "range": 5,
        description : 'The Trebuchet is a very powerful siege engine. It is equally strong against all unit types. Its drawback is that it takes up 10 population and costs an enormous amount of Wood.',
        building : 'Workshop',
        population : 10,
        "resource": {
            "gold": 375,
            "iron": 563,
            "wood": 1500,
            "food": 188
        },
        "strength": {
            "barrack": 200,
            "archer": 200,
            "stable": 200,
            "workshop": 200
        }
    }
]
async function InitBuilding() {
    const promise = []
    for (let index = 0; index < resources.length; index++) {
        const resouce = resources[index];
        const ishave = await ResourceDatas.findOne({name : resouce.name})
        if(!ishave) {
            promise.push(ResourceDatas.create(resouce)) 
        }
        if(ishave) {
            promise.push(ResourceDatas.findByIdAndUpdate(ishave._id , resouce))
        }
    }
    for (let index = 0; index < buildings.length; index++) {
        const building = buildings[index];
        const resource = await ResourceDatas.findOne({name : building.resource})
        const ishave = await BuildingDatas.findOne({name : building.name})
        if(!ishave) {
            promise.push(BuildingDatas.create({
                ...building,
                resource : resource?._id
            }))
        }
        if(ishave) {
            promise.push(
                BuildingDatas.findByIdAndUpdate(ishave._id , {
                    ...building,
                    resource : resource?._id
                })
            )
        }
    }

    for (let index = 0; index < units.length; index++) {
        const unit = units[index];
        const building = await BuildingDatas.findOne({name : unit.building})
        const ishave = await UnitDatas.findOne({name : unit.name})
        if(!ishave) {
            promise.push(UnitDatas.create({
                ...unit,
                building : building?._id
            }))
        }
        if(ishave) {
            promise.push(UnitDatas.findByIdAndUpdate(ishave._id , {
                ...unit,
                building : building?._id
            }))
        }
    }
    
    await Promise.all(promise)
    console.log('inited');
    
}

export default InitBuilding