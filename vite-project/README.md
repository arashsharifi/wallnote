با سلام خسته نباشید خدمت شما بزرگ واران برای این پرژه از لابری های که استفاده شده نام میبرم 

react-icons/
react-beautiful-dnd
react-hook-form
@hookform/resolvers/yup
react-multi-date-picker/plugins/time_picker
react-date-object/calendars/persian
react-date-object/locales/persian_fa
moment-jalaali
uuid
react-datepicker
react-time-picker

تایپ اسکریپت پرژه  :  
بنده از روش    
Lifting State Up   
استفاده کردم برای پاس دادن state ها 
و پراپس های مد نظر 
سی کردم استاندارد ترین حالت ممکن اینتر فیس برای کامپوننت ها بنویسم اگر وقت بود می تونستم اینتر فیس هامو اکسپورتم هم بکنم ولی برای لاجیک پرژه وقتی نداشتم 

(context api )  می تونستم بزنم ولی وقت نشد 😊  
یا حتی از State Management  ها هم می توانستم کار کنم 

tailwind css :
کل پرژه با استفاده از فرمورک tailwind طراحی شده 
وهمچینی بنده یک طیف رنگی داینامیک آبجکتی ساخته ام که داخل کامپوننت نوبار ایکونش هست اگر روش کلید شود 
شما می توانید به صورت دل خواه کل رنگ پرژه را تغییر دهید 
و به صورت grid ریسپانسیو شده است 

ویک سری انیمیشن های جزئی هست که باز بیشتر  می توانستم انجام دهم 



نحوه ذخیره نوت ها :
نوت های این پرژه در فضای لوکااستوریج ذخیره می شوند به اسمه کلیدی نوتس و همچین با استفاده از استیت 
رندر میشود در کامپونت نوکارت


لایبری 
react-beautiful-dnd

با استفاده از کامپونت های 
  DragDropContext,
  Draggable,
  DroppableProvided,
  DropResult,
    
  ویک کتمپوننت کاستوم شده به اسمه 
  StrictModeDroppable

  شما می توناید تمام نوت هارو به رویداد 
  onclick و نگه داشتن کلید راست موس المنت هارو جا به جا کنید 
  که بسیار خوب در اندازه دیواس موبایل کار می کند 

  کل این پرژه فقط یک مدال دارد که با استفاده از استیت status 
  کامپوننت های متعددی را ردنر می کنه مثل 

  ShowDetails
  AddFormV2
  DeletComponent

deadLine:
هر نوتی در داخل این پرژه از سال تا ماه تا ساعت و دیقه دارای انقضا می باشد 
ینی چه نوتی باشه انقضای یک ماه تا 10 ساعته می توانید داشته باشید 
همچینی نیاز به رفرش کردن برای دیدن منقظی شدن نوت نیست 
حالا تو این قضیه باید از بحس 
 memoization  استفاده می کردم ولی واقعا وقت نشد 
 از useEffect برای به‌روزرسانی وضعیت انقضای آیتم‌ها در هر 60 ثانیه استفاده
 تو کامپوننت NavCart

 

 کامپوننت  
 DeletComponent:
 این کامپوننت داخل مدال رندر میشود 
 برای پاک کردن نوت های داخل لوکا استوریج استفاده می کنم که یک با استفاده از ایدی یونیک شده آبجکت را پیدا کرده و حذف می کنم 

کامپوننت 
AddFormV2:
این کامپونت داخل مدال رندر میشود 
این کامپوننت هم وظیفه اضافه کرردن نوت هارو دارد و هم ویرایش نوت ها که تولید و انقضا نوت هارو به صورت سال شمسی ذخیره می کند با استفاده از 

useForm برای اینمه همه فیلد های ضروری پرشود 
و هم yup که حال آبکجت 
schema  باشد role ها مشخص شود 
و هم از لایبری زیبای 
react-multi-date-picker  
برای داشتن  سال شمسی 

و همچینی اگر که از سمت کامپوننت نوکارت آیدی پاس داده شد بیاد با با استفاده از آیدی آبجکت مد نظر را پیدا کرده و این دفعه بجای اد کردن ادیت را انجام دهد 


کامپوننت 
ShowDetails
به صورت موازی وظیفه نشان دادن جزئیات  را دارد و اگر روی عنوان و هم جزئیات دابل کلید شو از همین جا می توان ادیت را انجام داد 
این کامپوننت به صورت موازی با 
NavCart 
وظیفه نشنا دادن منقضی بودن یا منقضی نبودن 
DeadLine را با استفاده از 
آبجکت new Date و چک کردن آن را دارد 

وهمچنین قابلیت sreach با استفاده از رویداد onchange 

در این پرژه می توانید با استفاده صدا زدن کارکتر های عنوان سرچ را انجام دهید 


خیلی ممنونم از وقتی که برای خواندن مطالب گذاشتین و فرصتی که به من دادین تا خودمو محک بزنم 
به امید همکاری با شما 
🙏🙏

 