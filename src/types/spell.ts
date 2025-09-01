export interface SpellListItem {
  index: string;
  name: string;
  url: string;
}

export interface SpellDetail {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: {
    index: string;
    name: string;
    url: string;
  };
  classes: {
    index: string;
    name: string;
    url: string;
  }[];
  subclasses: {
    index: string;
    name: string;
    url: string;
  }[];
  damage?: {
    damage_type: {
      index: string;
      name: string;
      url: string;
    };
    damage_at_character_level?: Record<string, string>;
    damage_at_slot_level?: Record<string, string>;
  };
  dc?: {
    dc_type: {
      index: string;
      name: string;
      url: string;
    };
    dc_success: string;
    desc?: string[];
  };
  url: string;
  updated_at?: string;
}
