var householdSchema = mongoose.Schema({
  numberOfChildren: string
})

var household = mongoose.model("household", householdSchema);