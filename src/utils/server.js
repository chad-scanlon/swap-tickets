exports.up = function (knex) {
    return knex.schema
        .createTable("tickets", (tbl) => {
            tbl.increments();
            tbl.text("salesperson").notNullable();
            tbl.text("year");
            tbl.text("model").notNullable();
            tbl.text("body");
            tbl.text("pep");
            tbl.text("ext");
            tbl.text("int");
            tbl.text("options");
            tbl.text("notes");
        })
        .createTable("drivers", (tbl) => {
            tbl.increments();
            tbl.text("salesperson").notNullable();
            tbl.text("description").notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("drivers")
        .dropTableIfExists("tickets");
};

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("tickets")
        .truncate()
        .then(function () {
            // Inserts seed entries
            return knex("tickets").insert([
                {
                    id: 1,
                    salesperson: "Dwight",
                    year: "2021",
                    model: "IROC Z",
                    body: " coupe",
                    pep: "900a",
                    ext: "red",
                    int: "black",
                    options: "none",
                    notes: "must be classy",
                },
            ]);
        });
};

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("drivers")
        .truncate()
        .then(function () {
            // Inserts seed entries
            return knex("drivers").insert([
                {
                    id: 1,
                    salesperson: "Dwight",
                    description: "drop my new car off at my beet farm",
                },
            ]);
        });
};
