from django.contrib import admin

# Register your models here.
from .models import AutomobileVO


class AutomobileVOAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
