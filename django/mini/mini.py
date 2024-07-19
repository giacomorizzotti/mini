from django.forms.renderers import TemplatesSetting

# Custom forms
class MiniFormRenderer(TemplatesSetting):
    form_template_name = "mini/form.html"