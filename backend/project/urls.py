from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/chat/", include("apps.chat.api.urls")),
    path("api/auth/", views.obtain_auth_token),
]
