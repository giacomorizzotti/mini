class Website:

    def __init__(

        self,
        title=None,
        company_long=None,
        company=None,
        address=None,
        house_number=None,
        city=None,
        province=None,
        postal_code=None,
        country=None,
        email=None,
        phone=None,
        services_email=None,
        pec_email=None,
        tax_id=None,
        pers_id=None,

        open_hours=None,

        logo_height=None,
        scroll_logo_height=None,

        main_color=None,
        main_color_dark=None,
        second_color=None,
        second_color_dark=None,
        third_color=None,
        third_color_dark=None,
        fourth_color=None,
        fourth_color_dark=None,
        fourth_color_darker=None,
        link_color=None,
        link_hover_color=None,
        success_color=None,
        warning_color=None,
        danger_color=None,
        gingerbread_color=None,
        acid_green=None,
        pulse_color=None,
        main_color_transparent=None,

        theme_color = 'var(--main-color)',

        AOS = True,

        ):

        self.title = title
        self.company_long = company_long
        self.company = company
        self.address = address
        self.house_number = house_number
        self.city = city
        self.province = province
        self.postal_code = postal_code
        self.country = country
        self.email = email
        self.phone = phone
        self.services_email = services_email
        self.pec_email = pec_email
        self.tax_id = tax_id
        self.pers_id = pers_id

        self.open_hours = open_hours

        self.logo_height = logo_height
        self.scroll_logo_height = scroll_logo_height

        self.main_color = main_color
        self.main_color_dark = main_color_dark
        self.second_color = second_color
        self.second_color_dark = second_color_dark
        self.third_color = third_color
        self.third_color_dark = third_color_dark
        self.fourth_color = fourth_color
        self.fourth_color_dark = fourth_color_dark
        self.fourth_color_darker = fourth_color_darker
        self.link_color = link_color
        self.link_hover_color = link_hover_color
        self.success_color = success_color
        self.warning_color = warning_color
        self.danger_color = danger_color
        self.gingerbread_color = gingerbread_color
        self.acid_green = acid_green
        self.pulse_color = pulse_color
        self.main_color_transparent = main_color_transparent

        self.theme_color = theme_color
        
        self.AOS = AOS

        self.css_root_vars = {}

        if self.logo_height:
            self.css_root_vars['--logo-height'] = self.logo_height
        if self.scroll_logo_height:
            self.css_root_vars['--scroll-logo-height'] = self.scroll_logo_height

        if self.main_color:
            self.css_root_vars['--main-color'] = self.main_color
        if self.main_color_dark:
            self.css_root_vars['--main-color-dark'] = self.main_color_dark
        if self.second_color:
            self.css_root_vars['--second-color'] = self.second_color
        if self.second_color_dark:
            self.css_root_vars['--second-color-dark'] = self.second_color_dark
        if self.third_color:
            self.css_root_vars['--third-color'] = self.third_color
        if self.third_color_dark:
            self.css_root_vars['--third-color-dark'] = self.third_color_dark
        if self.fourth_color:
            self.css_root_vars['--fourth-color'] = self.fourth_color
        if self.fourth_color_dark:
            self.css_root_vars['--fourth-color-dark'] = self.fourth_color_dark
        if self.link_color:
            self.css_root_vars['--link-color'] = self.link_color
        if self.link_hover_color:
            self.css_root_vars['--link-hover-color'] = self.link_hover_color
        if self.success_color:
            self.css_root_vars['--success'] = self.success_color
        if self.warning_color:
            self.css_root_vars['--warning'] = self.warning_color
        if self.danger_color:
            self.css_root_vars['--danger'] = self.danger_color
        if self.gingerbread_color:
            self.css_root_vars['--ginger-bread'] = self.gingerbread_color
        if self.acid_green:
            self.css_root_vars['--acid-green'] = self.acid_green
        if self.pulse_color:
            self.css_root_vars['--pulse-color'] = self.pulse_color
        if self.main_color_transparent:
            self.css_root_vars['--main-color-transp'] = self.main_color_transparent

        self.colors = {}

        if self.main_color:
            self.colors['main_color'] = self.main_color
        if self.main_color_dark:
            self.colors['main_color_dark'] = self.main_color_dark
        if self.second_color:
            self.colors['second_color'] = self.second_color
        if self.second_color_dark:
            self.colors['second_color_dark'] = self.second_color_dark
        if self.third_color:
            self.colors['third_color'] = self.third_color
        if self.third_color_dark:
            self.colors['third_color_dark'] = self.third_color_dark
        if self.fourth_color:
            self.colors['fourth_color'] = self.fourth_color
        if self.fourth_color_dark:
            self.colors['fourth_color_dark'] = self.fourth_color_dark
        if self.fourth_color_darker:
            self.colors['fourth_color_darker'] = self.fourth_color_darker
        if self.link_color:
            self.colors['link_color'] = self.link_color
        if self.link_hover_color:
            self.colors['link_hover_color'] = self.link_hover_color
        if self.success_color:
            self.colors['success_color'] = self.success_color
        if self.warning_color:
            self.colors['warning_color'] = self.warning_color
        if self.danger_color:
            self.colors['danger_color'] = self.danger_color
        if self.gingerbread_color:
            self.colors['gingerbread_color'] = self.gingerbread_color
        if self.acid_green:
            self.colors['acid_green'] = self.acid_green
        if self.pulse_color:
            self.colors['pulse_color'] = self.pulse_color
        if self.main_color_transparent:
            self.colors['main_color_transparent'] = self.main_color_transparent

    def get_title(self):
        return self.title
    def get_company_long(self):
        return self.company_long
    def get_company(self):
        return self.company
    def get_house_number(self):
        return self.house_number
    def get_city(self):
        return self.city
    def get_province(self):
        return self.province
    def get_postal_code(self):
        return self.postal_code
    def get_country(self):
        return self.country
    def get_email(self):
        return self.email
    def get_phone(self):
        return self.phone
    def get_services_email(self):
        return self.services_email
    def get_pec_email(self):
        return self.pec_email
    def get_tax_id(self):
        return self.tax_id
    def get_pers_id(self):
        return self.pers_id
    
    def get_open_hours(self):
        return self.open_hours
    
    def get_company_variables(self):
        company_variables = {
            'company':self.company,
            'company_long':self.company_long,
            'address':self.address,
            'house_number':self.house_number,
            'city':self.city,
            'province':self.province,
            'postal_code':self.postal_code,
            'country':self.country,
            'email':self.email,
            'phone':self.phone,
            'services_email':self.services_email,
            'pec_email':self.pec_email,
            'full_address':self.address,
            'address_line_1':str(self.address)+' '+str(self.house_number),
            'address_line_2':str(self.postal_code)+' '+str(self.city)+' ('+str(self.province)+')'+', '+str(self.country),
            'tax_id':self.tax_id,
            'pers_id':self.pers_id,
            'colors':self.colors
        }
        return company_variables
    
    def get_theme_variables(self):
        theme_variables = {
            'theme_color':self.theme_color,
        }
        return theme_variables
    
    def get_colors(self):
        colors = self.colors
        return colors
    
    def get_css_root_vars(self):
        return self.css_root_vars