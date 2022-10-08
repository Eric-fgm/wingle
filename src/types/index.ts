export interface Database {
  public: {
    Tables: {
      guildsRelations: {
        Row: {
          id: number
          userId: string
          guildId: string
        }
      }
      guilds: {
        Row: {
          id: string
          name: string
          thumbnailUrl: string
          createdAt: string
          modifiedAt: string
        }
      }
      channels: {
        Row: {
          id: string
          name: string
          isPrivate: boolean
          guildId: string
          createdAt: string
          modifiedAt: string
        }
      }
    }
  }
}
