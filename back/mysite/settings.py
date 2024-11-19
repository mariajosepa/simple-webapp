"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""
import environ
import platform
from pathlib import Path
import os


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-zm9t9_25cwz(nrzgdw+pp#l5tf-sv*9e*yteqb+luvtt)@2**_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'dispositivos',
    'usuarios',
    'servicios',
    'autenticacion',
    'videos',
    'rest_framework',
    'rest_framework_gis',
    'django.contrib.gis',
    'django.core.mail',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_USUARIO_NAME'),
        'USER': env('DB_USUARIO_USER'),
        'PASSWORD': env('DB_USUARIO_PASSWORD'),
        'HOST': env('DB_USUARIO_HOST'),
        'PORT': env('DB_USUARIO_PORT'),
        'OPTIONS': {
            'unix_socket': '/tmp/mysql.sock',  # Add this line to use the socket
        },
    },
    'dispositivos': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_DISPOSITIVO_NAME'),
        'USER': env('DB_DISPOSITIVO_USER'),
        'PASSWORD': env('DB_DISPOSITIVO_PASSWORD'),
        'HOST': env('DB_DISPOSITIVO_HOST'),
        'PORT': env('DB_DISPOSITIVO_PORT'),
    },
    'servicios': {
        'ENGINE': 'django.contrib.gis.db.backends.mysql',
        'NAME': env('DB_SERVICIO_NAME'),
        'USER': env('DB_SERVICIO_USER'),
        'PASSWORD': env('DB_SERVICIO_PASSWORD'),
        'HOST': env('DB_SERVICIO_HOST'),
        'PORT': env('DB_SERVICIO_PORT'),
    },
    'sessions_db': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db_sessions.sqlite3',
    },
    'videos': {
        'ENGINE': 'django.contrib.gis.db.backends.mysql',
        'NAME': env('DB_VIDEO_NAME'),
        'USER': env('DB_VIDEO_USER'),
        'PASSWORD': env('DB_VIDEO_PASSWORD'),
        'HOST': env('DB_VIDEO_HOST'),
        'PORT': env('DB_VIDEO_PORT'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#Esto es para que django pueda encontrar la librería GDAL
if platform.system() == "Windows":
    GDAL_LIBRARY_PATH = 'C:/OSGeo4W/bin/gdal309.dll'
elif platform.system() == "Darwin":  # macOS
    GDAL_LIBRARY_PATH = '/opt/homebrew/lib/libgdal.dylib'
else:
    GDAL_LIBRARY_PATH = None  # O una ruta para Linux, si aplica

if GDAL_LIBRARY_PATH:
    os.environ["GDAL_LIBRARY_PATH"] = GDAL_LIBRARY_PATH


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # Cambia esto según el servicio de correo que uses
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('EMAIL_HOST_USER')  # El correo que enviará el mensaje
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')  # La contraseña de la cuenta

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_DATABASE_ALIAS = 'sessions_db'
