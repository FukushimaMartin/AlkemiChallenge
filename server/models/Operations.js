module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define("Operations", {
    typeOperation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOperation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
  
  // Posts.associate = (models) => {
  //   Posts.hasMany(models.Comments, {
  //     onDelete: "cascade"
  //   })
  // }

  return Operations
}