from django.contrib import admin

from .models import AutomobileVO


class AutomobileVOAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
