const Category = require("../model/Category");

class AdminCategory {
  pageCategories(req, res) {
    res.render("page/adminCategory", { layout: false });
  }
  pageAddCategory(req, res) {
    res.render("page/adminAddCategory", { layout: false });
  }
  addCategory(req, res) {
    const name = req.body.name;
    if (!name) {
      return res
        .status(400)
        .json({ error: "Tên danh mục không được để trống" });
    }

    const category = new Category({ name });

    category
      .save()
      .then((savedCategory) => {
        res.json({status :200,
          message: "Thêm danh mục thành công",
          category: savedCategory,
        });
      })
      .catch((err) => {
        console.error("Lỗi khi lưu danh mục:", err);
        res.status(500).json({ error: "Lỗi khi lưu danh mục" });
      });
  }
  async inforCategory(req, res) {
    const id = req.params._id;
    try {
      const product = await Category.findOne({ _id: id });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateCategory(req, res) {
    const id = req.body.id; 
    const  name  = req.body.name; 
    try {
        // Kiểm tra id và name trước khi cập nhật
        if (!id || !name) {
            return res.status(400).json({ error: "Thiếu thông tin id hoặc name" });
        }

        // Tìm và cập nhật category trong cơ sở dữ liệu
        const cate = await Category.findOneAndUpdate({ _id: id }, { name: name });

        if (!cate) {
            return res.status(404).json({ error: "Không tìm thấy category" });
        }

        res.status(200).json({ message: "Chỉnh sửa danh mục thành công", category: cate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
  async deleCategory(req, res) {
    try{
    const cate =await Category.findOneAndDelete({ _id: req.query._id})
    res.status(200).json({status: 200, message: "Xóa danh mục thành công", category: cate });
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
    }
}

module.exports = new AdminCategory();
