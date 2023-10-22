import { Dispatch, SetStateAction } from "react";

export type AppointmentType = {
    name?: string;
    gender?: string;
    age?: string;
    date: string;
    time: string;
};

export type AppointmentSliceType = {
    name?: string;
    gender?: string;
    age?: string;
    date: string;
    time: string;
};

// export type Team = {
//     runList: number[];
//     totalRun: number;
// } & Country

// export type Match = {
//     id: string;
//     ball_first: number;
//     team1: Team;
//     team2: Team;
// };

// export type CountryContextType = {
//     selectedCountries: Country[];
//     setSelectedCountries: Dispatch<SetStateAction<Country[]>>;
// };
