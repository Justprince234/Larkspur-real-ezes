from django.contrib import admin

from . models import Property, Contact, AboutContact


admin.site.site_header = 'Larkspur Homes LLC'
admin.site.site_title = 'Larkspur Homes LLC'
admin.site.index_title = 'Larkspur Homes LLC ADMIN'

# Register your models here.
class PropertyAdmin(admin.ModelAdmin):

    list_display = ('title', 'available')
    prepopulated_fields = {"slug": ("title",)}
    list_display_links = ('title',)
    search_fields = ('title', 'country')
    list_per_page = 25

admin.site.register(Property, PropertyAdmin)

class ContactAdmin(admin.ModelAdmin):

    list_display = ('name', 'message')
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 25

admin.site.register(Contact, ContactAdmin)

class AboutContactAdmin(admin.ModelAdmin):

    list_display = ('name', 'message')
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 25

admin.site.register(AboutContact, AboutContactAdmin)
