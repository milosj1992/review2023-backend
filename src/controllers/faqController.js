const connection = require("../config/db");

// Get FAQ category by ID
function getFAQCategoryById(req, res) {
  const categoryId = req.params.id;
  let sql = `SELECT * FROM \`faq_kategorije\` WHERE \`id\` = ${categoryId}`;
  
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.json({ statusCode: 500, error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ statusCode: 404, error: "FAQ category not found" });
    } else {
      res.json(results[0]);
    }
  });
}

// Edit FAQ category by ID
function editFAQCategory(req, res) {
  const categoryId = req.params.id;
  const newTitle = req.body.title;

  let sql = `UPDATE \`faq_kategorije\` SET \`ime\` = '${newTitle}' WHERE \`id\` = ${categoryId};`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error updating FAQ category:", err);
      res.json({ statusCode: 500, error: "Internal server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ statusCode: 404, error: "FAQ category not found" });
    } else {
      console.log("FAQ category updated successfully.");
      res.json({ statusCode: 200, message: "FAQ category updated successfully" });
    }
  });
}

// Add new FAQ category
function addFAQCategory(req, res) {
  const title = req.body.title;
  const lang = req.body.language;
  const listOrder = req.body.listOrder;

  let sql = `INSERT INTO \`faq_kategorije\` (\`id\`, \`ime\`, \`jezik\`, \`listorder\`) VALUES (NULL, '${title}', '${lang}', ${listOrder});`;
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error adding FAQ category:", err);
      res.json({ statusCode: 500, error: "Internal server error" });
    } else {
      console.log("FAQ category added successfully.");
      res.json({ statusCode: 200, message: "FAQ category added successfully" });
    }
  });
}

// Delete FAQ category by ID
function deleteFAQCategory(req, res) {
  const categoryId = req.params.id;

  let sql = `DELETE FROM \`faq_kategorije\` WHERE \`id\` = ${categoryId};`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error deleting FAQ category:", err);
      res.json({ statusCode: 500, error: "Internal server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ statusCode: 404, error: "FAQ category not found" });
    } else {
      console.log("FAQ category deleted successfully.");
      res.json({ statusCode: 200, message: "FAQ category deleted successfully" });
    }
  });
}

// Get list of FAQ categories
function getFAQCategories(req, res) {
  const page = parseInt(req.query.page) || 1;
  let lang = req.query.lang || "all";
  const rowsPerPage = parseInt(req.query.rowsPerPage) || 50;
  
  // Handle language filtering if lang is not "all"
  lang = lang === "all" ? "" : `WHERE \`jezik\` IN (${lang.split(",").map((country) => `'${country}'`).join(", ")})`;

  let sql = `SELECT * FROM \`faq_kategorije\` ${lang}`;
  let countSql = `SELECT COUNT(*) as total FROM \`faq_kategorije\` ${lang}`;

  if (page !== 0 && rowsPerPage !== 0) {
    const offset = (page - 1) * rowsPerPage;
    sql += ` LIMIT ${rowsPerPage} OFFSET ${offset}`;
  }

  connection.query(countSql, (countErr, countResults) => {
    if (countErr) {
      console.error("Error executing count query:", countErr);
      res.json({ statusCode: 500, error: "Internal Server Error" });
      return;
    }

    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.json({ statusCode: 500, error: "Internal Server Error" });
        return;
      }

      const totalRows = countResults[0].total;
      const response = {
        results,
        currentPage: page,
        rowsPerPage,
        totalRows,
      };

      res.json(response);
    });
  });
}

module.exports = {
  getFAQCategoryById,
  editFAQCategory,
  addFAQCategory,
  deleteFAQCategory,
  getFAQCategories,
};
