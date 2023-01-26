export interface IModel {
    id              : string;
    description     : string;
    comment         : string;
    created_at      : Date;
}

export interface IBaseModel {
    active          : boolean;
    skill           : ISkill;
}

export interface ILovval extends IModel, IBaseModel {
    [key: string]   : unknown;
    lov_id          : number;
    lov             : ILov;
}

export interface ILov extends IModel, IBaseModel {
    [key: string]   : unknown;
    lov_vals        : ILovval[];
    detail?         : string;
}


export interface ISkill {
    items           : string;
    filter          : string;
    date            : string;
    location        : string;
    type            : string;
    img             : string;
    url             : string;
}
