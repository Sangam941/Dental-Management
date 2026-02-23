export interface Doctor {
    name: string;
    specialty: string;
    description: string;
    imageUrl: string;
    rating: number;
    experience: number;
    languages: string[];
}

export interface NavItem {
    label: string;
    href: string;
}
