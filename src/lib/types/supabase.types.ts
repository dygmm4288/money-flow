export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      assets: {
        Row: {
          amount: number | null;
          card: number | null;
          created_at: string;
          id: number;
          name: string;
          type: "은행" | "카드" | "저축";
          updated_at: string;
          user: string;
        };
        Insert: {
          amount?: number | null;
          card?: number | null;
          created_at?: string;
          id?: number;
          name: string;
          type?: "은행" | "카드" | "저축";
          updated_at?: string;
          user: string;
        };
        Update: {
          amount?: number | null;
          card?: number | null;
          created_at?: string;
          id?: number;
          name?: string;
          type?: "은행" | "카드" | "저축";
          updated_at?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assets_card_fkey";
            columns: ["card"];
            isOneToOne: false;
            referencedRelation: "cards";
            referencedColumns: ["id"];
          }
        ];
      };
      cards: {
        Row: {
          asset: number;
          created_at: string;
          id: number;
          name: Json;
        };
        Insert: {
          asset: number;
          created_at?: string;
          id?: number;
          name: Json;
        };
        Update: {
          asset?: number;
          created_at?: string;
          id?: number;
          name?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "cards_asset_fkey";
            columns: ["asset"];
            isOneToOne: false;
            referencedRelation: "assets";
            referencedColumns: ["id"];
          }
        ];
      };
      cards_duplicate: {
        Row: {
          asset: number;
          created_at: string;
          id: number;
          name: Json;
        };
        Insert: {
          asset: number;
          created_at?: string;
          id?: number;
          name: Json;
        };
        Update: {
          asset?: number;
          created_at?: string;
          id?: number;
          name?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "cards_duplicate_asset_fkey";
            columns: ["asset"];
            isOneToOne: false;
            referencedRelation: "assets";
            referencedColumns: ["id"];
          }
        ];
      };
      pay: {
        Row: {
          amount: number | null;
          category: string | null;
          created_at: string;
          date: string | null;
          id: number;
          location: string | null;
          riskLevel: string | null;
          tags: string[] | null;
          type: string | null;
          user: string;
        };
        Insert: {
          amount?: number | null;
          category?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          location?: string | null;
          riskLevel?: string | null;
          tags?: string[] | null;
          type?: string | null;
          user: string;
        };
        Update: {
          amount?: number | null;
          category?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          location?: string | null;
          riskLevel?: string | null;
          tags?: string[] | null;
          type?: string | null;
          user?: string;
        };
        Relationships: [];
      };
      pay_duplicate: {
        Row: {
          amount: number | null;
          category: string | null;
          created_at: string;
          date: string | null;
          id: number;
          location: string | null;
          riskLevel: string | null;
          tags: string[] | null;
          type: string | null;
        };
        Insert: {
          amount?: number | null;
          category?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          location?: string | null;
          riskLevel?: string | null;
          tags?: string[] | null;
          type?: string | null;
        };
        Update: {
          amount?: number | null;
          category?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          location?: string | null;
          riskLevel?: string | null;
          tags?: string[] | null;
          type?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_expanse_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_expense_duplicate_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_expense_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_expense_with_date: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_grouped_pay_data: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_income_duplicate_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_income_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_income_with_date: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: {
          category: string;
          total_amount: number;
        }[];
      };
      get_pay_by_type: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          type: string;
          amount: number;
          other_columns: Json;
        }[];
      };
      get_pay_data: {
        Args: {
          payment_type: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
