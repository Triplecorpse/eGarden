export interface IProgram {
    name: string,
    version: string,
    daylight: {
        start: string,
        end: string
    },
    airTemperature: {
        day: 25,
        night: 15
    },
    soilTemperature: {
        day: 25,
        night: 15
    },
    airHumidity: {
        day: 25,
        night: 25
    },
    soilHumidity: {
        day: 25,
        night: 25
    }
}
