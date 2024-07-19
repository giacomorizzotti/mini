import string, random
from datetime import datetime
from django.conf import settings
from .website import Website


try:
    mini = settings.MINI
except AttributeError as e:
    print(f"AttributeError: {e}")
    mini = Website()
    

def randomCode(n):
    
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(n))

def basicContext(request, context):

    # viewmoney
    viewmoney = str(request.GET.get('viewmoney'))
    if viewmoney is not None:
        if viewmoney == 'True' or viewmoney == 'False':
            request.session['viewmoney'] = viewmoney

    mgmt_app = 'aroma_management_backoffice.apps.AromaManagementBackofficeConfig' in settings.INSTALLED_APPS
    context['mgmt_app'] = mgmt_app

    gdpr_app = 'gdpr.apps.GdprConfig' in settings.INSTALLED_APPS
    context['gdpr_app'] = gdpr_app

    aroma_menu_app = 'aroma_menu.apps.AromaMenuConfig' in settings.INSTALLED_APPS
    context['aroma_menu_app'] = aroma_menu_app

    aroma_reserv_app = 'aroma_reserv.apps.AromaReservConfig' in settings.INSTALLED_APPS
    context['aroma_reserv_app'] = aroma_reserv_app

    aroma_reserv_table_app = 'aroma_reserv_table.apps.AromaReservTableConfig' in settings.INSTALLED_APPS
    context['aroma_reserv_table_app'] = aroma_reserv_table_app

    aroma_reserv_event_app = 'aroma_reserv_event.apps.AromaReservEventConfig' in settings.INSTALLED_APPS
    context['aroma_reserv_event_app'] = aroma_reserv_event_app

    aroma_reserv_pheno_stage_dinner_app = 'aroma_reserv_pheno_stage_dinner.apps.AromaReservPhenoStageDinnerConfig' in settings.INSTALLED_APPS
    context['aroma_reserv_stage_dinner_app'] = aroma_reserv_pheno_stage_dinner_app
    
    aroma_shop_app = 'aroma_shop.apps.AromaShopConfig' in settings.INSTALLED_APPS
    context['aroma_shop_app'] = aroma_shop_app

    context['webapp_title'] = mini.get_title()
    context['company_variables'] = mini.get_company_variables()
    context['theme_variables'] = mini.get_theme_variables()

    context['css_root_vars'] = mini.get_css_root_vars()
    if mini.main_color:
        context['theme_color'] = mini.main_color

    if request.user.groups.filter(name = 'manager').exists():
        context['user_manager'] = True

    return context

class DateConverter:
    regex = '\d{4}-\d{1,2}-\d{1,2}'
    format = '%Y-%m-%d'

    def to_python(self, value):
        return datetime.strptime(value, self.format).date()

    def to_url(self, value):
        return value.strftime(self.format)  

