
# About Routes


### :link: Login route (/Login)  [POST]
this route can be used to register , login and relogin users below parameters that can be used in this route with all requests methods must be POST .

- **name** : type string,min-length 1, max-length 255, used to define user full name.
- **email** : type email, used to define user email address.
- **sexe** : type string,min-length 1 , max-length 1 , only F(female) or M(male) characters are accepted, used to define user sexe . 
- **avatar** : type string,used to link user avatar image ,the image can be linked from /storage/images/avatars/.
- **social** : type enumirated [ FB => facebook , GG => google , LC => local]
- **token** : type string , represent password or social token 
> :heavy_exclamation_mark: while login with email and password social must equals to LC and password will be passed via the parameter token .

### :link: user registration route (/register) [POST]
this route can be used create new user using email and password .
required fields : 
**name** -> required, string:255
**email** -> required, email
**password** -> required, string
**avatar** -> mimes:jpg,png,jpeg,jfif
**sexe** -> required, Rule::in(["F", "M"])
> :warning: to avoid any internal error an SMTP server should be configured in **.env** or **config/mail.php**

### :link: user account verification route (/verify/{code}-{ui}) [GET]
this route is used to verify user account using a code that sent to email. **ui** represente user id.

### :link: user account verification resend route (/resend/{email}) [GET]
this route is used to resend verification code to user . **email** represente user email.

### :link: user password recovery route (/recovery/{email}) [GET]
this route is used torecover user password . **email** represente user email.

### :link: user password recovery step 1 route (/password/recovery/step/1) [POST]
this route is used torecover user password (step 1) code verification . **email** represente user email , **code** code sent by email.

### :link: user password recovery step 2 route (/password/recovery/step/2) [POST]
this route is used torecover user password (step 2) new password . **email** represente user email , **code** code sent by email, **newpwd** new password.

### :link: user informations update route (/update) [PATCH]
this route can be used to update user informations , only the the **id** are required .

### :link: user profile information /user/profile/{id} [GET]
the route is used to get user informations using user id .

### :link: CSRF Token route (/csrf_token) [GET]
this route used to get a **CSRF** token , a token will be displayed directly after a request with **GET** method , the route don't require any parameter . 

### :link: Assests Links (/storage/images/) [GET]
all aassets are available on this link .
- **avatars/** for users avatars .
- **recipes/** for recipes images .
- **ingredients/** for ingredients images .

## :warning: **the routes bellow should be prefixed with language prefix** ,languages available FR, EN, AR
> :heavy_exclamation_mark: In case of non language prefix passed , the data will be in french language
### :link: Categories route (/categories/{param}) [GET]
this route is used for categories , to get all categories **param** should be equals to **ALL** in cas of unique select **param** should equals to the desired categorie's **id** in case of a multiple select **param** should equals to the desired categories **id**s separed with **,** . 

### :link: SubCategories route (/subCategories/{param}) [GET]
this route is used for subCategories , to get all subCategories **param** should be equals to **ALL** in cas of unique select **param** should equals to the desired subCategorie's **id** in case of a multiple select **param** should equals to the desired subCategories **id**s separed with **,** .

### recipe route (/recipes/{recipes}) [GET]
this route is used for recipes , to get all recipes **recipe** should be equals to **ALL** in cas of unique select **recipe** should equals to the desired recipe's **id** in case of a multiple select **recipe** should equals to the desired recipes **id**s separed with **,** .
in this route there is some additional flags that can be used optionaly .
- **withSubCat** the attribute subCategorie will containe an **SubCategorie** object. 
- **withSteps** a new array attribute will be appended to the object , will containe **RecipeSteps** object. 
- **withIngredients** a new array attribute will be appended to the object , will containe **RecipeIngredient** object. 

### recipe route (/recipes/paginated/{RPP}) [GET]
this route is used for recipes , the **RPP** represent the number of recipes per page , then an object will be returned with the link of the next and previous pages link and data will containe recipes .

### :link: ingredients route (/ingredients/{param}) [GET]
this route is used for ingredients , to get all ingredients **param** should be equals to **ALL** in cas of unique select **param** should equals to the desired ingredient's **id** in case of a multiple select **param** should equals to the desired ingredients **id**s separed with **,** .

### :link: ingredient categories route (/ingredients/categories/{param}) [GET]
this route is used for ingredient categories , to get all ingredient categories **param** should be equals to **ALL** in cas of unique select **param** should equals to the desired ingredient categorie's **id** in case of a multiple select **param** should equals to the desired ingredient categories **id**s separed with **,** .

### :link: recipe images route (/recipe/{recipe}/images/{param}) [GET]
this route is used for recipe images , to get all recipe images **param** should be equals to **ALL** and **recipe** to the recipe id, in cas of unique select **param** should equals to the desired recipe image's **id** and **recipe** to the recipe id, in case of a multiple select **param** should equals to the desired recipe images **id**s separed with **,** and **recipe** to the recipe id .

### :link: get recipe rates route (/recipe/rates/{userId}/{recipe}) [GET]
this route is used to get recipe rate for a selected user .

### :link: add recipe rate route (/recipe/{recipe}/rate/{rate}/{userId}) [POST]
this route is used to add new rate .

### :link: recipe ingredients route (/recipe/ingredients/{param}) [GET]
to fetch all data **param** should equals to **ALL** , for unique or multiple select **param** should equals to row **id**s separed with **,** . 
a fetch can be filtred by using arguments bellow : 
- **recipe** equals to recipe id ,only one recipe id can be passed , it will return only ingredients who belong to the recipe .
- **ingredients** equals to ingredients id ,multiple ingredients ids are accepted , it will return an array of **Recipe** that containe at least one ingredient .

### :link: user favorites route (/user/{user_id}/favorites) [GET]
this route is used to get user favorites recipes using user id .

### :link: delete user favorite route (/user/favorites/{id}/delete) [DELETE]
this route is used to delete user favorites recipes using favorites id , CSRF token required.

### :link: add user favorite route (/user/{user}/favorites/{recipe}) [POST]
this route is used to add user favorites recipes , CSRF token required.

### :link: user history route (/user/{user_id}/history) [GET]
this route is used to get user history recipes using user id .

### :link: add user history route (/user/{user}/history/{recipe}) [POST]
this route is used to add user histories recipes , CSRF token required.

### :link: smart search (/smart/search/{ids}) [GET]
wasfast smart search feature , **ids** is the list of the ingredients id's separed with **,** .
