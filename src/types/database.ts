// Database types for Supabase
// Generated from database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
      }
      bases: {
        Row: {
          id: string
          user_id: string
          name: string
          level: number
          experience: number
          resources: Json
          position_x: number
          position_y: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          level?: number
          experience?: number
          resources?: Json
          position_x: number
          position_y: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          level?: number
          experience?: number
          resources?: Json
          position_x?: number
          position_y?: number
          created_at?: string
          updated_at?: string
        }
      }
      building_types: {
        Row: {
          id: string
          name: string
          description: string | null
          max_level: number
          base_cost: Json
          upgrade_multiplier: number
          production: Json | null
          requirements: Json | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          max_level?: number
          base_cost: Json
          upgrade_multiplier?: number
          production?: Json | null
          requirements?: Json | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          max_level?: number
          base_cost?: Json
          upgrade_multiplier?: number
          production?: Json | null
          requirements?: Json | null
        }
      }
      base_buildings: {
        Row: {
          id: string
          base_id: string
          building_type_id: string
          level: number
          position_x: number
          position_y: number
          is_constructing: boolean
          construction_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          base_id: string
          building_type_id: string
          level?: number
          position_x: number
          position_y: number
          is_constructing?: boolean
          construction_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          base_id?: string
          building_type_id?: string
          level?: number
          position_x?: number
          position_y?: number
          is_constructing?: boolean
          construction_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      unit_types: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          attack: number
          defense: number
          speed: number
          range: number
          cost: Json
          training_time: number
          requirements: Json | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          attack: number
          defense: number
          speed: number
          range: number
          cost: Json
          training_time: number
          requirements?: Json | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          attack?: number
          defense?: number
          speed?: number
          range?: number
          cost?: Json
          training_time?: number
          requirements?: Json | null
        }
      }
      base_units: {
        Row: {
          id: string
          base_id: string
          unit_type_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          base_id: string
          unit_type_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          base_id?: string
          unit_type_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      battles: {
        Row: {
          id: string
          attacker_base_id: string
          defender_base_id: string
          attacker_units: Json
          defender_units: Json
          result: string
          attacker_losses: Json | null
          defender_losses: Json | null
          loot: Json | null
          started_at: string
          ended_at: string | null
          duration_seconds: number | null
        }
        Insert: {
          id?: string
          attacker_base_id: string
          defender_base_id: string
          attacker_units: Json
          defender_units: Json
          result: string
          attacker_losses?: Json | null
          defender_losses?: Json | null
          loot?: Json | null
          started_at?: string
          ended_at?: string | null
          duration_seconds?: number | null
        }
        Update: {
          id?: string
          attacker_base_id?: string
          defender_base_id?: string
          attacker_units?: Json
          defender_units?: Json
          result?: string
          attacker_losses?: Json | null
          defender_losses?: Json | null
          loot?: Json | null
          started_at?: string
          ended_at?: string | null
          duration_seconds?: number | null
        }
      }
      alliances: {
        Row: {
          id: string
          name: string
          tag: string
          description: string | null
          leader_id: string
          level: number
          member_count: number
          max_members: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tag: string
          description?: string | null
          leader_id: string
          level?: number
          member_count?: number
          max_members?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tag?: string
          description?: string | null
          leader_id?: string
          level?: number
          member_count?: number
          max_members?: number
          created_at?: string
          updated_at?: string
        }
      }
      alliance_members: {
        Row: {
          id: string
          alliance_id: string
          user_id: string
          role: string
          joined_at: string
        }
        Insert: {
          id?: string
          alliance_id: string
          user_id: string
          role?: string
          joined_at?: string
        }
        Update: {
          id?: string
          alliance_id?: string
          user_id?: string
          role?: string
          joined_at?: string
        }
      }
      map_tiles: {
        Row: {
          x: number
          y: number
          terrain: string
          resource_bonus: Json | null
          base_id: string | null
          is_spawn_point: boolean
        }
        Insert: {
          x: number
          y: number
          terrain: string
          resource_bonus?: Json | null
          base_id?: string | null
          is_spawn_point?: boolean
        }
        Update: {
          x?: number
          y?: number
          terrain?: string
          resource_bonus?: Json | null
          base_id?: string | null
          is_spawn_point?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience type aliases
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Domain types
export type User = Tables<'users'>
export type Base = Tables<'bases'>
export type BuildingType = Tables<'building_types'>
export type BaseBuilding = Tables<'base_buildings'>
export type UnitType = Tables<'unit_types'>
export type BaseUnit = Tables<'base_units'>
export type Battle = Tables<'battles'>
export type Alliance = Tables<'alliances'>
export type AllianceMember = Tables<'alliance_members'>
export type MapTile = Tables<'map_tiles'>