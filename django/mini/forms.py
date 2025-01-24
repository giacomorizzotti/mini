from django import forms
import copy
from django.utils.choices import normalize_choices
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

class MiniCheckboxSelectMultiple(forms.widgets.CheckboxSelectMultiple):
    template_name = 'mini/forms/widgets/checkbox_multiple_input.html'
    option_template_name = 'mini/forms/widgets/checkbox_multiple_input_option.html'
    
class MiniDataList(forms.widgets.ChoiceWidget):
    input_type = 'text'
    template_name = 'mini/forms/widgets/datalist.html'
    option_template_name = 'mini/forms/widgets/datalist_option.html'
    add_id_index = False
    option_inherits_attrs = False
    
    def optgroups(self, name, value, attrs=None):
        """Return a list of optgroups for this widget."""
        groups = []

        for index, (option_value, option_label) in enumerate(self.choices):
            if option_value is None:
                option_value = ""

            subgroup = []
            if isinstance(option_label, (list, tuple)):
                group_name = option_value
                subindex = 0
                choices = option_label
            else:
                group_name = None
                subindex = None
                choices = [(option_value, option_label)]
            groups.append((group_name, subgroup, index))

            for subvalue, sublabel in choices:
                subgroup.append(
                    self.create_option(
                        name,
                        subvalue,
                        sublabel,
                        index,
                        subindex=subindex,
                        attrs=attrs,
                    )
                )
                if subindex is not None:
                    subindex += 1
        return groups

    def create_option(
        self, name, value, label, index, subindex=None, attrs=None
    ):
        index = str(index) if subindex is None else "%s_%s" % (index, subindex)
        option_attrs = (
            self.build_attrs(self.attrs, attrs) if self.option_inherits_attrs else {}
        )
        if "id" in option_attrs:
            option_attrs["id"] = self.id_for_label(option_attrs["id"], index)
        return {
            "name": name,
            "value": value,
            "label": label,
            "index": index,
            "attrs": option_attrs,
            "type": self.input_type,
            "template_name": self.option_template_name,
            "wrap_label": True,
        }
    
    def format_value(self, value):
        return '' if value is None else value
    
class MiniDataListField(forms.fields.ChoiceField):
    widget = MiniDataList
    
    default_error_messages = {
        'invalid_choice': _('Select a valid choice. %(value)s is not one of the available choices.'),
    }

    def __init__(self, *, choices='', **kwargs):
        super().__init__(**kwargs)
        self.choices = choices
        
    def validate(self, value):
        pass

class MiniMultipleChoiceField(forms.fields.MultipleChoiceField):
    widget = MiniCheckboxSelectMultiple
    