from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.chat.api.viewsets import ChatsHistoryReadOnlyViewSet, MessageReadCreateViewSet

router = DefaultRouter()

router.register(r"history", ChatsHistoryReadOnlyViewSet, basename="chats-history")
router.register(r"messages", MessageReadCreateViewSet, basename="messages")

urlpatterns = [
    path("", include(router.urls)),
]
