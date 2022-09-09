from django.shortcuts import render, get_object_or_404, redirect

from .models import Property, Contact, AboutContact

# Create your views here.
def home(request):
    """Displays the index page."""
    template_name = 'index.html'
    return render(request, template_name)

def properties(request):
    """Displays the properties page."""
    properties  = Property.objects.filter(available=True)
    template_name = 'properties.html'
    return render(request, template_name, {'properties': properties})

def property(request, slug):
    """Displays the blog page."""
    property = get_object_or_404(Property, slug=slug, available=True)
    template_name = 'property-details.html'
    return render(request, template_name, {'property': property})

def contact(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        phone = request.POST['phone']
        message = request.POST['message']
        contact = Contact.objects.create(name=name, email=email, phone=phone, message=message)
        contact.save()
    return redirect('core:properties')

def about_contact(request):
    if request.method == 'POST':
        name = request.POST['name']
        surname = request.POST['surname']
        email = request.POST['email']
        phone = request.POST['phone']
        message = request.POST['message']
        contact = AboutContact.objects.create(name=name, surname=surname, email=email, phone=phone, message=message)
        contact.save()
    return redirect('core:blog')

def advisors(request):
    """Displays the advisors page."""
    template_name = 'advisors.html'
    return render(request, template_name)

def intelligence(request):
    """Displays the intelligence page."""
    template_name = 'intelligence.html'
    return render(request, template_name)

def private_listings(request):
    """Displays the private listings page."""
    template_name = 'private_listings.html'
    return render(request, template_name)

def properties_search(request):
    """Displays the properties search page."""
    template_name = 'properties-search.html'
    return render(request, template_name)

def services(request):
    """Displays the services page."""
    template_name = 'services.html'
    return render(request, template_name)

def blog(request):
    """Displays the blog page."""
    template_name = 'blog.html'
    return render(request, template_name)

def search(request):
    q = request.GET['q']
    properties = Property.objects.filter(country__icontains=q)
    return render(request,'properties-search.html', {'properties': properties})