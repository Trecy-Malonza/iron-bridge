export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_amenities: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_blog_posts: {
        Row: {
          author: string
          category: string
          created_at: string
          excerpt: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_categories: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_clients: {
        Row: {
          company: string
          contact_person: string
          created_at: string
          email: string
          id: string
          occupied_space: string
          phone: string
          renewal_status: string
          updated_at: string
        }
        Insert: {
          company: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          occupied_space?: string
          phone?: string
          renewal_status?: string
          updated_at?: string
        }
        Update: {
          company?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          occupied_space?: string
          phone?: string
          renewal_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          sender_name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          sender_name: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          sender_name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_leads: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          requirement: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          name: string
          phone?: string
          requirement?: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          requirement?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_locations: {
        Row: {
          created_at: string
          id: string
          lat: number
          lng: number
          name: string
          region: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lat?: number
          lng?: number
          name: string
          region?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lat?: number
          lng?: number
          name?: string
          region?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_media: {
        Row: {
          created_at: string
          id: string
          media_type: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_type?: string
          title: string
          updated_at?: string
          url?: string
        }
        Update: {
          created_at?: string
          id?: string
          media_type?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      admin_pages: {
        Row: {
          created_at: string
          id: string
          path: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          path?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_properties: {
        Row: {
          category: string
          clear_height: string
          created_at: string
          description: string
          dock_doors: string
          featured: boolean
          highlights: Json
          id: string
          images: Json
          lease_type: string
          location: string
          name: string
          offer: string
          power_supply: string
          price: string
          property_code: string
          property_type: string
          security: string
          size: string
          status: string
          updated_at: string
          water_supply: string
          year_built: string
          zoning: string
        }
        Insert: {
          category?: string
          clear_height?: string
          created_at?: string
          description?: string
          dock_doors?: string
          featured?: boolean
          highlights?: Json
          id?: string
          images?: Json
          lease_type?: string
          location?: string
          name: string
          offer?: string
          power_supply?: string
          price?: string
          property_code?: string
          property_type?: string
          security?: string
          size?: string
          status?: string
          updated_at?: string
          water_supply?: string
          year_built?: string
          zoning?: string
        }
        Update: {
          category?: string
          clear_height?: string
          created_at?: string
          description?: string
          dock_doors?: string
          featured?: boolean
          highlights?: Json
          id?: string
          images?: Json
          lease_type?: string
          location?: string
          name?: string
          offer?: string
          power_supply?: string
          price?: string
          property_code?: string
          property_type?: string
          security?: string
          size?: string
          status?: string
          updated_at?: string
          water_supply?: string
          year_built?: string
          zoning?: string
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          address: string
          company_name: string
          created_at: string
          email: string
          id: string
          phone: string
          summary: string
          updated_at: string
        }
        Insert: {
          address?: string
          company_name?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          summary?: string
          updated_at?: string
        }
        Update: {
          address?: string
          company_name?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          created_at: string
          department: string
          description: string
          employment_type: string
          experience: string
          id: string
          location: string
          status: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          experience?: string
          id?: string
          location?: string
          status?: string
          summary?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          experience?: string
          id?: string
          location?: string
          status?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
