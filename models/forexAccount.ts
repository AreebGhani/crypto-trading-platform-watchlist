import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import forexAccountSignal from "./forexAccountSignal";
import forexSignal from "./forexSignal";
import user from "./user";

// =============================
// Interfaces for Type Definitions
// =============================

// Attributes for forexAccount
export interface forexAccountAttributes {
  id: string;
  userId?: string;
  accountId?: string;
  password?: string;
  broker?: string;
  mt?: number;
  balance: number;
  leverage?: number;
  type: "DEMO" | "LIVE";
  status?: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}

// Creation Attributes (Optional Fields)
export interface forexAccountCreationAttributes
  extends Partial<forexAccountAttributes> {}

// =============================
// Model Definition
// =============================
export default class forexAccount
  extends Model<forexAccountAttributes, forexAccountCreationAttributes>
  implements forexAccountAttributes
{
  id!: string;
  userId?: string;
  accountId?: string;
  password?: string;
  broker?: string;
  mt?: number;
  balance!: number;
  leverage?: number;
  type!: "DEMO" | "LIVE";
  status?: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;

  // =============================
  // Association Methods
  // =============================

  public forexAccountSignals!: forexAccountSignal[];
  public getForexAccountSignals!: Sequelize.HasManyGetAssociationsMixin<forexAccountSignal>;
  public addForexAccountSignal!: Sequelize.HasManyAddAssociationMixin<forexAccountSignal, string>;
  public removeForexAccountSignal!: Sequelize.HasManyRemoveAssociationMixin<forexAccountSignal, string>;

  public forexSignals!: forexSignal[];
  public getForexSignals!: Sequelize.BelongsToManyGetAssociationsMixin<forexSignal>;
  public addForexSignal!: Sequelize.BelongsToManyAddAssociationMixin<forexSignal, string>;
  public removeForexSignal!: Sequelize.BelongsToManyRemoveAssociationMixin<forexSignal, string>;

  public user!: user;
  public getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  public setUser!: Sequelize.BelongsToSetAssociationMixin<user, string>;

  // =============================
  // Model Initialization
  // =============================
  public static initModel(sequelize: Sequelize.Sequelize): typeof forexAccount {
    return forexAccount.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: true,
          validate: {
            isUUID: { args: 4, msg: "userId: User ID must be a valid UUID" },
          },
        },
        accountId: {
          type: DataTypes.STRING(191),
          allowNull: true,
          validate: {
            notEmpty: { msg: "accountId: Account ID must not be empty" },
          },
        },
        password: {
          type: DataTypes.STRING(191),
          allowNull: true,
          validate: {
            notEmpty: { msg: "password: Password must not be empty" },
            len: {
              args: [6, 191],
              msg: "password: Password must be between 6 and 191 characters long",
            },
          },
        },
        broker: {
          type: DataTypes.STRING(191),
          allowNull: true,
          validate: {
            notEmpty: { msg: "broker: Broker name must not be empty" },
          },
        },
        mt: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            isInt: { msg: "mt: MT version must be an integer" },
          },
        },
        balance: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isFloat: { msg: "balance: Balance must be a number" },
          },
        },
        leverage: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            isInt: { msg: "leverage: Leverage must be an integer" },
          },
        },
        type: {
          type: DataTypes.ENUM("DEMO", "LIVE"),
          allowNull: false,
          defaultValue: "DEMO",
          validate: {
            isIn: {
              args: [["DEMO", "LIVE"]],
              msg: "type: Type must be either 'DEMO' or 'LIVE'",
            },
          },
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          validate: {
            isBoolean: { msg: "status: Status must be a boolean value" },
          },
        },
      },
      {
        sequelize,
        modelName: "forexAccount",
        tableName: "forex_account",
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "forexAccountUserIdFkey",
            using: "BTREE",
            fields: [{ name: "userId" }],
          },
        ],
      }
    );
  }

  // =============================
  // Associations
  // =============================
  public static associate(models: any) {
    // forexAccount hasMany forexAccountSignal
    forexAccount.hasMany(models.forexAccountSignal, {
      as: "forexAccountSignals",
      foreignKey: "forexAccountId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // forexAccount belongsToMany forexSignal
    forexAccount.belongsToMany(models.forexSignal, {
      as: "forexSignals",
      through: models.forexAccountSignal,
      foreignKey: "forexAccountId",
      otherKey: "forexSignalId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // forexAccount belongsTo user
    forexAccount.belongsTo(models.user, {
      as: "user",
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

// =============================
// Export with Alias
// =============================
export { forexAccount as forexAccount };
