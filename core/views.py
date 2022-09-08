from django.shortcuts import render

from .models import Property

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