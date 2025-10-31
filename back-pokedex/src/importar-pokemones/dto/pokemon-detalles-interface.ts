export interface PokemonDetalles {
    abilities:                Ability[];
    base_experience:          number;
    cries:                    Cries;
    forms:                    Forms;
    game_indices:             GameIndex[];
    height:                   number;
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_abilities:           PastAbilities;
    species:                  Forms;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
}

export interface Ability {
    ability:   Forms;
    is_hidden: boolean;
    slot:      number;
}

export interface Forms {
    name: string;
    url:  string;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface GameIndex {
    game_index: number;
    version:    Forms;
}

export interface Move {
    move:                  Forms;
    version_group_details: VersionGroupDetail[] | VersionGroupDetailsClass;
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Forms;
    order:             number | string;
    version_group:     Forms;
}

export interface VersionGroupDetailsClass {
    level_learned_at:  number;
    move_learn_method: Forms;
    order:             string;
    version_group:     Forms;
}

export interface PastAbilities {
    abilities:  Abilities;
    generation: Forms;
}

export interface Abilities {
    ability:   string;
    is_hidden: boolean;
    slot:      number;
}

export interface GenerationV {
    "black-white": Sprites;
}

export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
}

export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
}

export interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
    showdown:           Sprites;
}

export interface Sprites {
    back_default:       string;
    back_female:        string;
    back_shiny:         string;
    back_shiny_female:  string;
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
    other?:             Other;
    versions?:          Versions;
    animated?:          Sprites;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
}

export interface RedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
}

export interface Crystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
}

export interface Gold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
}

export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface Home {
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
}

export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
    front_default: string;
    front_female:  string;
}

export interface GenerationViii {
    icons: DreamWorld;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Forms;
}

export interface Type {
    slot: number;
    type: Forms;
}
