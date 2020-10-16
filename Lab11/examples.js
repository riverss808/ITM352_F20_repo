age = 19;
name = "Dan";
attributes = name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
parts = attributes.split(";",2);
console.log(parts);