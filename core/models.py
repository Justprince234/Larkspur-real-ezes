from operator import mod
from django.db import models
from django.urls import reverse

# Create your models here.

class Property(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    country = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, default="defaultimage.png")
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, default="defaultimage.png")
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, default="defaultimage.png")
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, default="defaultimage.png")
    description = models.TextField(null=True, blank=True)
    price = models.CharField(max_length=20)
    number_of_bedroom = models.IntegerField(null=True, blank=True)
    number_of_bathroom = models.IntegerField(null=True, blank=True)
    living_area = models.CharField(max_length=20, null=True, blank=True)
    lot_size = models.CharField(max_length=20, null=True, blank=True)
    available = models.BooleanField(default=True)
    reserved = models.BooleanField(default=False)


    class Meta:
        verbose_name_plural = "Property Listings"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('core:property', args=[self.slug])

class Contact (models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    message = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Property Contact Us"

    def __str__(self):
        return self.name

class AboutContact (models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    message = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "About Contact Us"

    def __str__(self):
        return self.name