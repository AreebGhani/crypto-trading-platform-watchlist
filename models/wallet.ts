import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import ecosystemPrivateLedger from "./ecosystemPrivateLedger";
import ecosystemUtxo from "./ecosystemUtxo";
import investment from "./investment";
import transaction from "./transaction";
import user from "./user";
import walletData from "./walletData";

// Interface for attributes
export interface walletAttributes {
  id: string;
  userId: string;
  type: "FIAT" | "SPOT" | "ECO" | "FUTURES";
  currency: string;
  balance: number;
  inOrder?: number;
  address?: {
    [key: string]: { address: string; network: string; balance: number };
  };
  status: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}

// Interface for creation attributes
export interface walletCreationAttributes
  extends Partial<walletAttributes> {}

export default class wallet
  extends Model<walletAttributes, walletCreationAttributes>
  implements walletAttributes
{
  id!: string;
  userId!: string;
  type!: "FIAT" | "SPOT" | "ECO" | "FUTURES";
  currency!: string;
  balance!: number;
  inOrder?: number;
  address?: {
    [key: string]: { address: string; network: string; balance: number };
  };
  status!: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;

  // wallet belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, string>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  
  // wallet hasMany ecosystemPrivateLedger via walletId
  ecosystemPrivateLedgers!: ecosystemPrivateLedger[];
  getEcosystemPrivateLedgers!: Sequelize.HasManyGetAssociationsMixin<ecosystemPrivateLedger>;
  setEcosystemPrivateLedgers!: Sequelize.HasManySetAssociationsMixin<ecosystemPrivateLedger, string>;
  addEcosystemPrivateLedger!: Sequelize.HasManyAddAssociationMixin<ecosystemPrivateLedger, string>;
  addEcosystemPrivateLedgers!: Sequelize.HasManyAddAssociationsMixin<ecosystemPrivateLedger, string>;
  createEcosystemPrivateLedger!: Sequelize.HasManyCreateAssociationMixin<ecosystemPrivateLedger>;
  removeEcosystemPrivateLedger!: Sequelize.HasManyRemoveAssociationMixin<ecosystemPrivateLedger, string>;
  removeEcosystemPrivateLedgers!: Sequelize.HasManyRemoveAssociationsMixin<ecosystemPrivateLedger, string>;
  hasEcosystemPrivateLedger!: Sequelize.HasManyHasAssociationMixin<ecosystemPrivateLedger, string>;
  hasEcosystemPrivateLedgers!: Sequelize.HasManyHasAssociationsMixin<ecosystemPrivateLedger, string>;
  countEcosystemPrivateLedgers!: Sequelize.HasManyCountAssociationsMixin;

  public static initModel(sequelize: Sequelize.Sequelize): typeof wallet {
    return wallet.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          validate: {
            notNull: { msg: "userId: User ID cannot be null" },
            isUUID: { args: 4, msg: "userId: User ID must be a valid UUID" },
          },
        },
        type: {
          type: DataTypes.ENUM("FIAT", "SPOT", "ECO", "FUTURES"),
          allowNull: false,
          validate: {
            isIn: {
              args: [["FIAT", "SPOT", "ECO", "FUTURES"]],
              msg: "type: Type must be one of ['FIAT', 'SPOT', 'ECO', 'FUTURES']",
            },
          },
        },
        currency: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: { msg: "currency: Currency cannot be empty" },
          },
        },
        balance: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isFloat: { msg: "balance: Balance must be a number" },
          },
        },
        inOrder: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        address: {
          type: DataTypes.JSON,
          allowNull: true,
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
        modelName: "wallet",
        tableName: "wallet",
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
            name: "walletIdKey",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "walletUserIdCurrencyTypeKey",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "userId" },
              { name: "currency" },
              { name: "type" },
            ],
          },
        ],
      }
    );
  }
  public static associate(models: any) {
    wallet.hasMany(models.ecosystemPrivateLedger, {
      as: "ecosystemPrivateLedgers",
      foreignKey: "walletId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export { wallet as wallet };
