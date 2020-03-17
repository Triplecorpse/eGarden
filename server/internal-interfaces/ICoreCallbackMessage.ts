export type TType = 'daylight' | 'watering' | 'airHumidization' | 'airConditioning' | 'soilHumidization' | 'soilHeating';

interface ICoreCallbackMessage<T> {
    type: TType;
    oldValue: T;
    newValue: T;
}

export interface IDaylightChange extends ICoreCallbackMessage<boolean>{

}

export interface IWateringChange extends ICoreCallbackMessage<boolean>{

}

export interface IDaylightChange extends ICoreCallbackMessage<boolean>{

}

export interface IDaylightChange extends ICoreCallbackMessage<boolean>{

}
