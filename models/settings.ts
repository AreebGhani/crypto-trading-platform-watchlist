import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface settingsAttributes {
  key: string;
  value?: string | null;
}

export interface settingsCreationAttributes
  extends Partial<settingsAttributes> {}

export default class settings
  extends Model<settingsAttributes, settingsCreationAttributes>
  implements settingsAttributes
{
  key!: string;
  value?: string | null;

  
  public static async has(key: string): Promise<boolean> {
    const settings = await this.findOne({ where: { key } });
    return !!settings;
  }

 public static async get(key: string): Promise<string | null> {
  const settings = await this.findOne({ where: { key } });
  return settings?.value ?? null;
}

  public static initModel(sequelize: Sequelize.Sequelize): typeof settings {
    return settings.init(
      {
        key: {
          type: DataTypes.STRING(255),
          allowNull: false,
          primaryKey: true,
        },
        value: {
          type: DataTypes.TEXT("long"),
          allowNull: true,
          validate: {
            notEmpty: { msg: "value: Value cannot be empty" },
          },
        },
      },
      {
        sequelize,
        modelName: "settings",
        tableName: "settings",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "key" }],
          },
        ],
      }
    );
  }

  public static associate(models: any) {
    
  }
}


export { settings as settings };
