from django.urls import path
from API import views

urlpatterns = [
    path('resume_info/', views.ProfileView.as_view(), name="profile"),
    path('job_info/', views.JobView.as_view(), name="job_info"),
    path('jobinfo/<int:pk>', views.JobDetailView.as_view(), name='jobinfo'),
    path('resume_info1/', views.Profile1View.as_view(), name="profile"),
]

