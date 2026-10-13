module.exports = {

    NORMAL: {

        ph: {
            min: 7.0,
            max: 7.5
        },

        waterTemperature: {
            min: 25,
            max: 29
        },

        turbidity: {
            min: 1,
            max: 3
        }

    },

    HIGH_TURBIDITY: {

        ph: {
            min: 7,
            max: 7.4
        },

        waterTemperature: {
            min: 27,
            max: 30
        },

        turbidity: {
            min: 6,
            max: 9
        }

    },

    ACIDIC: {

        ph: {
            min: 5.5,
            max: 6.2
        },

        waterTemperature: {
            min: 27,
            max: 30
        },

        turbidity: {
            min: 2,
            max: 5
        }

    }

};