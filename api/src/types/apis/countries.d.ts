export interface ICountriesApi {
    name: Name
    tld?: string[]
    cca2: string
    ccn3?: string
    cca3: string
    independent?: boolean
    status: Status
    unMember: boolean
    currencies?: Currencies
    idd: Idd
    capital?: string[]
    altSpellings: string[]
    region: Region
    subregion?: string
    languages?: Record<string, string>
    translations: Record<string, Translation>
    latlng: number[]
    landlocked: boolean
    area: number
    demonyms?: Demonyms
    flag: string
    maps: Maps
    population: number
    car: Car
    timezones: string[]
    continents: Continent[]
    flags: Flags
    coatOfArms: CoatOfArms
    startOfWeek: StartOfWeek
    capitalInfo: CapitalInfo
    cioc?: string
    borders?: string[]
    gini?: Record<string, number>
    fifa?: string
    postalCode?: PostalCode
}

interface CapitalInfo {
    latlng?: number[]
}

interface Car {
    signs?: string[]
    side: Side
}

declare enum Side {
    Left = 'left',
    Right = 'right',
}

interface CoatOfArms {
    png?: string
    svg?: string
}

declare enum Continent {
    Africa = 'Africa',
    Antarctica = 'Antarctica',
    Asia = 'Asia',
    Europe = 'Europe',
    NorthAmerica = 'North America',
    Oceania = 'Oceania',
    SouthAmerica = 'South America',
}

interface Currencies {
    AUD?: Aed
    IDR?: Aed
    NOK?: Aed
    USD?: Aed
    EUR?: Aed
    BGN?: Aed
    ISK?: Aed
    MOP?: Aed
    CVE?: Aed
    XCD?: Aed
    LAK?: Aed
    GBP?: Aed
    IMP?: Aed
    CHF?: Aed
    FJD?: Aed
    CAD?: Aed
    MMK?: Aed
    DKK?: Aed
    FOK?: Aed
    BBD?: Aed
    ALL?: Aed
    TMT?: Aed
    KWD?: Aed
    MXN?: Aed
    GTQ?: Aed
    XOF?: Aed
    WST?: Aed
    XPF?: Aed
    ZWL?: Aed
    AFN?: Aed
    GNF?: Aed
    TWD?: Aed
    AOA?: Aed
    EGP?: Aed
    KRW?: Aed
    PLN?: Aed
    HKD?: Aed
    BOB?: Aed
    CNY?: Aed
    CZK?: Aed
    TRY?: Aed
    ARS?: Aed
    LKR?: Aed
    AMD?: Aed
    NGN?: Aed
    NIO?: Aed
    TTD?: Aed
    VND?: Aed
    AWG?: Aed
    BRL?: Aed
    IQD?: Aed
    JPY?: Aed
    MNT?: Aed
    VES?: Aed
    XAF?: Aed
    JEP?: Aed
    MWK?: Aed
    NAD?: Aed
    ZAR?: Aed
    RON?: Aed
    GHS?: Aed
    GGP?: Aed
    DZD?: Aed
    MAD?: Aed
    MRU?: Aed
    BZD?: Aed
    SYP?: Aed
    ZMW?: Aed
    YER?: Aed
    NZD?: Aed
    BAM?: BAM
    BYN?: Aed
    RSD?: Aed
    KZT?: Aed
    BWP?: Aed
    SEK?: Aed
    STN?: Aed
    MVR?: Aed
    MGA?: Aed
    UGX?: Aed
    THB?: Aed
    GEL?: Aed
    MDL?: Aed
    PYG?: Aed
    SHP?: Aed
    TJS?: Aed
    UZS?: Aed
    GYD?: Aed
    GMD?: Aed
    GIP?: Aed
    SDG?: BAM
    BIF?: Aed
    CDF?: Aed
    INR?: Aed
    PAB?: Aed
    KHR?: Aed
    TZS?: Aed
    UAH?: Aed
    MZN?: Aed
    VUV?: Aed
    PHP?: Aed
    ANG?: Aed
    BHD?: Aed
    SBD?: Aed
    COP?: Aed
    CKD?: Aed
    LSL?: Aed
    ERN?: Aed
    LYD?: Aed
    SSP?: Aed
    KPW?: Aed
    BDT?: Aed
    TOP?: Aed
    OMR?: Aed
    HTG?: Aed
    RUB?: Aed
    SAR?: Aed
    BSD?: Aed
    PKR?: Aed
    JMD?: Aed
    PEN?: Aed
    CLP?: Aed
    KYD?: Aed
    BMD?: Aed
    AED?: Aed
    BND?: Aed
    SGD?: Aed
    HUF?: Aed
    ILS?: Aed
    JOD?: Aed
    UYU?: Aed
    CRC?: Aed
    SLL?: Aed
    MUR?: Aed
    LBP?: Aed
    KMF?: Aed
    MYR?: Aed
    CUC?: Aed
    CUP?: Aed
    KES?: Aed
    KGS?: Aed
    MKD?: Aed
    IRR?: Aed
    FKP?: Aed
    DOP?: Aed
    HNL?: Aed
    RWF?: Aed
    ETB?: Aed
    PGK?: Aed
    AZN?: Aed
    LRD?: Aed
    SRD?: Aed
    SOS?: Aed
    SZL?: Aed
    QAR?: Aed
    SCR?: Aed
    KID?: Aed
    DJF?: Aed
    NPR?: Aed
    TND?: Aed
    TVD?: Aed
    BTN?: Aed
}

interface Aed {
    name: string
    symbol: string
}

interface BAM {
    name: string
}

interface Demonyms {
    eng: Eng
    fra?: Eng
}

interface Eng {
    f: string
    m: string
}

interface Flags {
    png: string
    svg: string
    alt?: string
}

interface Idd {
    root?: string
    suffixes?: string[]
}

interface Maps {
    googleMaps: string
    openStreetMaps: string
}

interface Name {
    common: string
    official: string
    nativeName?: Record<string, Translation>
}

interface Translation {
    official: string
    common: string
}

interface PostalCode {
    format: string
    regex?: string
}

declare enum Region {
    Africa = 'Africa',
    Americas = 'Americas',
    Antarctic = 'Antarctic',
    Asia = 'Asia',
    Europe = 'Europe',
    Oceania = 'Oceania',
}

declare enum StartOfWeek {
    Monday = 'monday',
    Saturday = 'saturday',
    Sunday = 'sunday',
}

declare enum Status {
    OfficiallyAssigned = 'officially-assigned',
    UserAssigned = 'user-assigned',
}
