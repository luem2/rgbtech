import type { ICountriesApi } from '../../../types/apis/countries'

import axios from 'axios'

import { db } from '../../'

export async function createCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v3.1/all')

        const countriesApi: ICountriesApi[] = result.data

        const countries = countriesApi.map((country) => {
            return {
                id: country.cca3,
                name: country.name.common,
                flag: country.flag,
                demonym: country.demonyms?.eng.m ?? 'Not demonym was found',
            }
        })

        await db.country.createMany({
            data: countries,
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}
