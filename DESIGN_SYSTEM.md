# Recipe Share Design System

هذا الملف هو المرجع البصري لكل صفحات المشروع. الهدف أن تبدو صفحات الفريق كأن شخصًا واحدًا صممها، مع الاعتماد على Bootstrap وكود CSS بسيط.

## 1. Design Direction

- الشكل: دافئ، نظيف، واحترافي مناسب لتطبيق وصفات.
- اللون الأساسي: Amber للأزرار والروابط والحالات النشطة.
- اللون الداكن: Navy للنـافبار والعناوين المهمة.
- المساحات واسعة والكروت بيضاء فوق خلفية رمادية فاتحة.
- استخدم Bootstrap أولًا، ثم الكلاسات العامة الموجودة في `frontend/src/styles.css`.

## 2. Colors

| Usage | Variable | Value |
|---|---|---|
| Primary actions | `--color-primary` | `#D97706` |
| Primary hover | `--color-primary-hover` | `#B45309` |
| Soft primary background | `--color-primary-soft` | `#FFF7ED` |
| Success | `--color-secondary` | `#16A34A` |
| Delete and errors | `--color-danger` | `#DC2626` |
| Main text and navbar | `--color-text` | `#1F2937` |
| Secondary text | `--color-text-muted` | `#6B7280` |
| Page background | `--color-bg-subtle` | `#F9FAFB` |
| Cards | `--color-bg` | `#FFFFFF` |
| Borders | `--color-border` | `#E5E7EB` |

Rules:

- لا تكتب ألوان Hex داخل component CSS.
- استخدم Amber للحفظ والإضافة والدخول.
- استخدم Red للحذف فقط.
- استخدم Green لرسائل النجاح فقط.

## 3. Typography

- استخدم خط Bootstrap الافتراضي، بدون تحميل خط خارجي.
- عنوان الصفحة: `h1` مع `fw-bold`.
- عنوان القسم: `h2` أو class مثل `h4`.
- عنوان الكارت: `h3 class="h5 fw-bold"`.
- النص الثانوي: `text-muted` أو `recipe-meta`.
- لا تستخدم أكثر من `h1` واحد داخل الصفحة.

## 4. Spacing and Layout

كل صفحة داخلية تبدأ بهذا الشكل:

```html
<main class="page-shell">
  <div class="container">
    <div class="page-header">
      <div>
        <p class="page-eyebrow">Recipe Share</p>
        <h1 class="fw-bold mb-2">Page Title</h1>
        <p class="text-muted mb-0">One short description for the page.</p>
      </div>

      <button class="btn btn-primary">Primary Action</button>
    </div>

    <!-- Page content -->
  </div>
</main>
```

Spacing rules:

- الصفحة: `page-shell`.
- بين أقسام الصفحة: `mb-4` أو `mb-5`.
- داخل الكارت: `p-4`.
- بين عناصر الفورم: `mb-3`.
- بين الأزرار: `gap-2`.

## 5. Navbar

استخدم نفس الـ navbar الموجود حاليًا في `app.html` على كل الصفحات.

- الارتفاع: `72px`.
- الخلفية: `--color-text`.
- الرابط النشط: `--color-primary`.
- قبل تسجيل الدخول: `Login` و`Register`.
- بعد تسجيل الدخول: `Recipes` و`My Recipes` و`Add Recipe` و`Logout`.
- لا تنشئ navbar مختلفًا داخل كل component.

## 6. Buttons

| Action | Bootstrap classes |
|---|---|
| Main action | `btn btn-primary` |
| Cancel or Back | `btn btn-outline-secondary` |
| Edit | `btn btn-outline-primary` |
| Delete | `btn btn-danger` |
| Full-width form submit | `btn btn-primary w-100 py-2` |

مثال لمجموعة أزرار:

```html
<div class="d-flex flex-wrap gap-2">
  <button class="btn btn-primary">Save Recipe</button>
  <button class="btn btn-outline-secondary">Cancel</button>
  <button class="btn btn-danger">Delete</button>
</div>
```

## 7. Recipe Card

استخدم هذا الشكل في صفحة كل الوصفات وصفحة وصفاتي:

```html
<article class="recipe-card">
  <img
    *ngIf="recipe.imageUrl; else noImage"
    class="recipe-card-image"
    [src]="recipe.imageUrl"
    [alt]="recipe.title"
  />

  <ng-template #noImage>
    <div class="recipe-card-image recipe-image-placeholder">No image available</div>
  </ng-template>

  <div class="p-4">
    <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
      <span class="badge text-bg-light">{{ recipe.category }}</span>
      <span class="recipe-meta">{{ recipe.cookTime }} min</span>
    </div>

    <h3 class="h5 fw-bold mb-2">{{ recipe.title }}</h3>
    <p class="recipe-description text-muted mb-3">{{ recipe.description }}</p>

    <a class="btn btn-outline-primary w-100" [routerLink]="['/recipes', recipe._id]">
      View Recipe
    </a>
  </div>
</article>
```

Grid للكروت:

```html
<div class="row g-4">
  <div class="col-12 col-md-6 col-lg-4" *ngFor="let recipe of recipes">
    <!-- Recipe card -->
  </div>
</div>
```

## 8. Search and Filters

ضع البحث والفلاتر داخل كارت واحد أعلى النتائج:

```html
<section class="section-card p-3 p-md-4 mb-4">
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <label class="form-label">Search recipes</label>
      <input class="form-control" type="search" placeholder="Search by recipe name" />
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">Category</label>
      <select class="form-select">
        <option value="">All categories</option>
      </select>
    </div>
  </div>
</section>
```

## 9. Forms

Create وEdit يستخدمان نفس الشكل:

```html
<main class="page-shell">
  <div class="container">
    <div class="form-card section-card p-4 mx-auto">
      <h1 class="h3 fw-bold mb-4">Add Recipe</h1>

      <div class="mb-3">
        <label class="form-label">Recipe title</label>
        <input class="form-control" type="text" />
        <div class="text-danger small mt-1">Validation message</div>
      </div>

      <div class="d-flex justify-content-end gap-2 mt-4">
        <button class="btn btn-outline-secondary">Cancel</button>
        <button class="btn btn-primary">Save Recipe</button>
      </div>
    </div>
  </div>
</main>
```

Form rules:

- كل input له label ظاهر.
- الخطأ تحت input مباشرة باستخدام `text-danger small mt-1`.
- زر الحفظ disabled عندما يكون الفورم غير صحيح.
- لا تستخدم popup للـ validation.
- لا تغيّر ترتيب الحقول بين Create وEdit.

## 10. Recipe Details Page

الترتيب الموحد:

1. زر Back.
2. صورة كبيرة.
3. العنوان والتصنيف ووقت الطهي وصاحب الوصفة.
4. Description.
5. Ingredients داخل `section-card`.
6. Steps داخل `section-card` مع أرقام واضحة.
7. Edit/Delete يظهران لصاحب الوصفة فقط.

```html
<section class="section-card p-4 mb-4">
  <h2 class="h4 fw-bold mb-3">Ingredients</h2>
  <ul class="mb-0">
    <li class="mb-2" *ngFor="let ingredient of recipe.ingredients">
      {{ ingredient }}
    </li>
  </ul>
</section>
```

## 11. Loading, Error, and Empty States

Loading:

```html
<div class="text-center py-5">
  <div class="spinner-border text-warning" role="status"></div>
  <p class="text-muted mt-3 mb-0">Loading recipes...</p>
</div>
```

Error:

```html
<div class="alert alert-danger" role="alert">
  Something went wrong. Please try again.
</div>
```

Empty state:

```html
<div class="empty-state">
  <h2 class="h4 fw-bold">No recipes yet</h2>
  <p class="text-muted">Start by sharing your first recipe.</p>
  <a class="btn btn-primary" routerLink="/recipes/add">Add Recipe</a>
</div>
```

كل صفحة بيانات يجب أن تحتوي على الحالات الثلاث، وليس النتائج فقط.

## 12. Page Blueprints

### All Recipes

- Page header.
- Search and category filters.
- Three-column recipe grid on desktop.
- Loading, error, and no-results states.

### My Recipes

- نفس Recipe Card بالضبط.
- زر `Add Recipe` في page header.
- Edit/Delete داخل الكارت أو صفحة التفاصيل لصاحب الوصفة فقط.

### Add/Edit Recipe

- Form داخل `section-card` بعرض أقصى `760px`.
- نفس ترتيب الحقول ونفس رسائل validation.

### Recipe Details

- صورة Hero بنسبة ثابتة.
- معلومات مختصرة تحت العنوان.
- Ingredients وSteps في كروت منفصلة.

### Login/Register

- استخدم الشكل الحالي بدون إنشاء تصميم جديد.
- عرض الكارت الأقصى `460px`.

## 13. Responsive Rules

- Mobile: عمود واحد، والأزرار يمكن أن تصبح بعرض كامل.
- Tablet: عمودان للكروت.
- Desktop: ثلاثة أعمدة للكروت.
- استخدم Bootstrap breakpoints: `col-12 col-md-6 col-lg-4`.
- لا تستخدم widths ثابتة للصفحة.
- كل الصور تستخدم `object-fit: cover`.

## 14. Do and Do Not

Do:

- استخدم `container`, `row`, `col-*`, `gap-*`, `p-*`, و`mb-*`.
- استخدم `page-shell`, `page-header`, `section-card`, و`recipe-card`.
- اجعل كل زر واضحًا من اسمه ولونه.
- أضف `alt` لكل صورة.

Do not:

- لا تكتب لونًا مختلفًا لكل صفحة.
- لا تستخدم inline styles إلا لقيمة layout خاصة جدًا.
- لا تنشئ شكل كارت وصفة جديدًا.
- لا تستخدم Red إلا للحذف والخطأ.
- لا تعرض Edit/Delete لمستخدم ليس صاحب الوصفة.

## 15. Pull Request Checklist

قبل فتح PR لأي صفحة Frontend:

- الصفحة تستخدم navbar العام.
- الألوان من CSS variables فقط.
- الأزرار تطابق جدول الأزرار.
- التصميم يعمل على mobile وdesktop.
- Loading وerror وempty states موجودة.
- لا توجد صورة مكسورة عند غياب `imageUrl`.
- `ng build` يعمل بدون errors.
- لا يوجد CSS مكرر يمكن استبداله بـ Bootstrap أو class عام.
